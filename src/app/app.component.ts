import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Cupon } from './cupon.model.js';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import confetti from 'canvas-confetti';
import { SURPRISE_POOL, SurpriseOption } from './models/surprise-pool.model.js';
import { GiphyServiceService } from './services/giphy-service.service.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  mysteryLastUsed: number | null = null;
  mysteryAvailable: boolean = true;
  hoursToWait: number = 24; 
  timeLeft: string = '';
  timeLeftString: string = '';

  surprisePool: SurpriseOption[] = SURPRISE_POOL; 
  
  surprise: SurpriseOption | null = null;
  surpriseTimeLeft: string = '';

  isSpinning: boolean = false; 


  initialCoupons: Cupon[] = [
    {
      id: 1,
      title: 'Asadito',
      emoji: '🥩',
      description: 'Yo cocino, yo sirvo, yo lavo los platos. Vos solo comés.',
      isRedeemed: false,
      terms: 'Válido para cualquier día, excepto cuando juega centralito.'
    },
    {
      id: 2,
      title: 'Masaje Anti-Estrés',
      emoji: '💆‍♀️',
      description: 'Sesión de 15 minutos de masajes de espalda post-estudio.',
      isRedeemed: false
    },
    {
      id: 3,
      title: 'Chocolate/ Helado/ Salado/ Coquita',
      emoji: '❤️‍🩹',
      description: 'Lo que quieras yo te lo consigo.',
      isRedeemed: false,
      cooldownHours: 12,
      lastRedeemed: 0
    },
    {
      id: 4,
      title: 'Vale Comodín',
      emoji: '🃏',
      description: 'Escribí acá el capricho que quieras y yo te lo cumplo.',
      isRedeemed: false,
      requiresInput: true, 
      userNote: ''
    }
  ];

  coupons: Cupon[] = [];
  currentGifUrl: string | null = null
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private giphyService: GiphyServiceService) 
    {
    this.coupons = this.initialCoupons;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      const savedCouponsJson = localStorage.getItem('loveCoupons');
      
      if (savedCouponsJson) {
        const savedCoupons: Cupon[] = JSON.parse(savedCouponsJson);
        
        this.coupons = this.initialCoupons.map(initCoupon => {
          const saved = savedCoupons.find(c => c.id === initCoupon.id);
          if (saved) {
            return {
              ...initCoupon, 
              isRedeemed: saved.isRedeemed, 
              lastRedeemed: saved.lastRedeemed, 
              userNote: saved.userNote || ''
            };
          }
          return initCoupon;
        });
      } else {
        this.coupons = this.initialCoupons;
      }

      setInterval(() => {
        this.updateTimers();
      }, 60000);
      
      this.checkDailySurprise();
      this.updateTimers(); 
    }
  }

  redeemCoupon(id: number) {
    const index = this.coupons.findIndex(c => c.id === id);
    const coupon = this.coupons[index];

    // CASO 1 Comodín con Input
    if (coupon.requiresInput) {
        if (!coupon.userNote || coupon.userNote.trim().length < 3) {
            alert('¡Escribí qué es lo que querés antes de canjear!');
            return;
        }
    }

    // CASO 2 Antojo con Timer
    if (coupon.cooldownHours) {
        const now = Date.now();
        if (coupon.lastRedeemed && (now - coupon.lastRedeemed) < (coupon.cooldownHours * 3600000)) {
            alert(`Tenés que esperar: ${this.timeLeftString}`);
            return;
        }

        this.coupons[index].lastRedeemed = now;
        this.coupons[index].isRedeemed = false; 
        this.saveState();
        this.triggerConfetti();
        this.updateTimers();
        return;
    }

    // CASO Normal
    if (!coupon.isRedeemed) {
       if (confirm(`¿Canjear "${coupon.title}"?`)) {
        this.coupons[index].isRedeemed = true;
        this.saveState();
        this.triggerConfetti();
       }
    }
  }

  saveState() {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('loveCoupons', JSON.stringify(this.coupons));}

  }
  


checkDailySurprise() {
    const savedData = localStorage.getItem('dailySurprise');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    
    if (parsedData.timestamp) {
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000; 

      if (now - parsedData.timestamp < twentyFourHours) {
        this.surprise = parsedData.surprise;
        this.currentGifUrl = parsedData.gifUrl;
      } else {
        localStorage.removeItem('dailySurprise');
        this.surprise = null;
      }
    }
  }
  }

  openSurprise() {
    if (this.surprise || this.isSpinning) return;

    this.isSpinning = true;

    const randomIndex = Math.floor(Math.random() * this.surprisePool.length);
    const selectedOption = this.surprisePool[randomIndex];

    const rating = selectedOption.category === 'picante' ? 'r' : 'g';

    this.giphyService.getRandomGif(selectedOption.query, rating).subscribe(url => {
      setTimeout(() => {
        this.surprise = selectedOption;
        this.currentGifUrl = url;

        if (isPlatformBrowser(this.platformId)) {
          const dataToSave = {
            timestamp: Date.now(),
            surprise: selectedOption,
            gifUrl: url
          };
          localStorage.setItem('dailySurprise', JSON.stringify(dataToSave));
        }
        
        this.isSpinning = false;
        this.triggerConfetti();

        this.updateTimers();
      }, 1500);
    });
  }

  // --- LÓGICA DEL CUPÓN SORPRESA (EL DEL JUEGO) ---
  onSurpriseChange(event: any) {
    const selectedText = event.target.value;
    const newOption = this.surprisePool.find(s => s.text === selectedText);
    
    if (newOption) {
      this.isSpinning = true;
      this.giphyService.getRandomGif(newOption.query).subscribe(url => {
         this.surprise = newOption;
         this.currentGifUrl = url;
         this.isSpinning = false;
         
        if (isPlatformBrowser(this.platformId)) {
            const savedData = localStorage.getItem('dailySurprise');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                // Mantenemos el timestamp original para no reiniciar el reloj
                const newData = {
                    ...parsed,
                    surprise: newOption,
                    gifUrl: url
                };
                localStorage.setItem('dailySurprise', JSON.stringify(newData));
            }
         }
      });
    }
  }

    updateTimers() {
    const now = Date.now();

    const cravingCoupon = this.coupons.find(c => c.cooldownHours);
    if (cravingCoupon && cravingCoupon.lastRedeemed) {
        const diff = now - cravingCoupon.lastRedeemed;
        const cooldownMs = cravingCoupon.cooldownHours! * 3600000;
        
        if (diff < cooldownMs) {
            const remaining = cooldownMs - diff;
            const hours = Math.floor(remaining / 3600000);
            const minutes = Math.floor((remaining % 3600000) / 60000);
            this.timeLeftString = `${hours}h ${minutes}m`;
        } else {
            this.timeLeftString = ''; 
        }
    }

    // Timer de la Sorpresa 
    const savedData = localStorage.getItem('dailySurprise');
      if (savedData) {
          const parsedData = JSON.parse(savedData);
          
          if (parsedData.timestamp) {
              const twentyFourHours = 24 * 60 * 60 * 1000;
              const unlockTime = parsedData.timestamp + twentyFourHours;
              const diffSurprise = unlockTime - now;

              if (diffSurprise > 0) {
                  const hours = Math.floor(diffSurprise / 3600000);
                  const minutes = Math.floor((diffSurprise % 3600000) / 60000);
                  this.surpriseTimeLeft = `${hours}h ${minutes}m`;
              } else {
                  this.surpriseTimeLeft = '';
                  this.surprise = null;
              }
          }
      }
  }


  // Confetti
  triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#C71585'] // Colores rosas/rojos románticos
    });
  }
}