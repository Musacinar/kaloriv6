/*import React, { createContext, useContext, useState, useEffect } from 'react';
import { Yemek, YemekBaglamiDegerleri, YemekVeritabani } from '../tipler';
import { kaydetYemekler, getirYemekler } from '../depolama';
import { bugunTarih, rastgeleId, hesaplaGunlukOzet } from '../yardimcilar';
import { supabase } from '../lib/supabase';



const YemekBaglami = createContext<YemekBaglamiDegerleri | undefined>(undefined);

export const YemekSaglayici: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [yemekler, setYemekler] = useState<Yemek[]>([]);
  const [hazirYemekler, setHazirYemekler] = useState<YemekVeritabani[]>([]);

  useEffect(() => {
    const kayitliYemekler = getirYemekler();
    setYemekler(kayitliYemekler);
    
    // Fetch ready-made foods from Supabase
    const getirHazirYemekler = async () => {
      const { data, error } = await supabase
        .from('yemekler')
        .select('*');
      
      if (error) {
        console.error('Hazır yemekler yüklenirken hata:', error);
        return;
      }
      
      setHazirYemekler(data || []);
    };
    
    getirHazirYemekler();
  }, []);

  useEffect(() => {
    kaydetYemekler(yemekler);
  }, [yemekler]);

  const yemekAra = (aramaMetni: string): YemekVeritabani[] => {
    const kucukHarfArama = aramaMetni.toLowerCase().trim();
    return hazirYemekler.filter(yemek => 
      yemek.ad.toLowerCase().includes(kucukHarfArama)
    );
  };

  const yemekEkle = (yeniYemek: Omit<Yemek, 'id'>) => {
    const yemek: Yemek = {
      ...yeniYemek,
      id: rastgeleId()
    };
    setYemekler(oncekiYemekler => [...oncekiYemekler, yemek]);
  };

  const yemekGuncelle = (id: string, guncelYemek: Partial<Yemek>) => {
    setYemekler(oncekiYemekler =>
      oncekiYemekler.map(yemek =>
        yemek.id === id ? { ...yemek, ...guncelYemek } : yemek
      )
    );
  };

  const yemekSil = (id: string) => {
    setYemekler(oncekiYemekler =>
      oncekiYemekler.filter(yemek => yemek.id !== id)
    );
  };

  const bugunYemekler = () => {
    return yemekler.filter(yemek => yemek.tarih === bugunTarih());
  };

  const bugunToplamKalori = () => {
    return bugunYemekler().reduce((toplam, yemek) => toplam + yemek.kalori, 0);
  };

  const bugunToplamBesinDegerleri = () => {
    const bugunYenenYemekler = bugunYemekler();
    return {
      protein: bugunYenenYemekler.reduce((toplam, yemek) => toplam + yemek.protein, 0),
      karbonhidrat: bugunYenenYemekler.reduce((toplam, yemek) => toplam + yemek.karbonhidrat, 0),
      yag: bugunYenenYemekler.reduce((toplam, yemek) => toplam + yemek.yag, 0)
    };
  };

  const ogunlereGoreYemekler = () => {
    const bugunYenenYemekler = bugunYemekler();
    return {
      'Kahvaltı': bugunYenenYemekler.filter(yemek => yemek.ogun === 'Kahvaltı'),
      'Öğle Yemeği': bugunYenenYemekler.filter(yemek => yemek.ogun === 'Öğle Yemeği'),
      'Akşam Yemeği': bugunYenenYemekler.filter(yemek => yemek.ogun === 'Akşam Yemeği'),
      'Ara Öğün': bugunYenenYemekler.filter(yemek => yemek.ogun === 'Ara Öğün')
    };
  };

  const gunlukOzet = (gun = bugunTarih()) => {
    return hesaplaGunlukOzet(gun, yemekler);
  };

  const sikKullanilanYemekler = () => {
    const yemekFrekansi: Record<string, number> = {};
    
    yemekler.forEach(yemek => {
      const anahtar = yemek.ad.toLowerCase();
      yemekFrekansi[anahtar] = (yemekFrekansi[anahtar] || 0) + 1;
    });
    
    const benzersizYemekler = yemekler.reduce<Record<string, Yemek>>((acc, yemek) => {
      const anahtar = yemek.ad.toLowerCase();
      if (!acc[anahtar]) {
        acc[anahtar] = yemek;
      }
      return acc;
    }, {});
    
    return Object.entries(yemekFrekansi)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([ad]) => benzersizYemekler[ad]);
  };

  const deger: YemekBaglamiDegerleri = {
    yemekler,
    hazirYemekler,
    yemekAra,
    yemekEkle,
    yemekGuncelle,
    yemekSil,
    bugunYemekler,
    bugunToplamKalori,
    bugunToplamBesinDegerleri,
    ogunlereGoreYemekler,
    gunlukOzet,
    sikKullanilanYemekler
  };

  return (
    <YemekBaglami.Provider value={deger}>
      {children}
    </YemekBaglami.Provider>
  );
};

export const useYemek = () => {
  const baglam = useContext(YemekBaglami);
  if (baglam === undefined) {
    throw new Error('useYemek kancası YemekSaglayici içinde kullanılmalıdır');
  }
  return baglam;
};*/

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Yemek, YemekBaglamiDegerleri, YemekVeritabani } from '../tipler';
import { kaydetYemekler, getirYemekler } from '../depolama';
import { bugunTarih, rastgeleId, hesaplaGunlukOzet } from '../yardimcilar';
import { supabase } from '../lib/supabase';

const YemekBaglami = createContext<YemekBaglamiDegerleri | undefined>(undefined);

export const YemekSaglayici: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [yemekler, setYemekler] = useState<Yemek[]>([]);
  const [hazirYemekler, setHazirYemekler] = useState<YemekVeritabani[]>([]);

  // Kullanıcının yediği yemekleri Supabase'den çek
  const getirKullaniciYemekleri = async () => {
    try {
      // Önce oturum açmış kullanıcıyı al
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      if (!user) {
        console.log('Kullanıcı giriş yapmamış');
        return; // Kullanıcı giriş yapmamışsa çık
      }

      // Kullanıcının yemeklerini çek
      const { data, error } = await supabase
        .from('kullanici_yemekleri')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Kullanıcı yemekleri yüklenirken hata:', error);
        return;
      }
      
      // Veritabanından gelen yemekleri Yemek formatına dönüştür
      const formatlananYemekler: Yemek[] = data?.map(item => ({
        id: item.id,
        ad: item.yemek_adi,
        kalori: item.kalori,
        porsiyon: item.porsiyon,
        birim: item.birim,
        protein: item.protein || 0,
        karbonhidrat: item.karbonhidrat || 0,
        yag: item.yag || 0,
        tarih: item.tarih || bugunTarih(), // Veritabanında tarih yoksa bugünü kullan
        ogun: item.ogun || 'Kahvaltı', // Veritabanında öğün yoksa varsayılan kullan
      })) || [];
      
      // Veritabanından gelen yemekleri state'e ekle
      setYemekler(formatlananYemekler);
      
      // Ayrıca local storage'a da kaydet (opsiyonel)
      kaydetYemekler(formatlananYemekler);
      
    } catch (err) {
      console.error('Kullanıcı yemekleri getirilirken hata:', err);
    }
  };

  useEffect(() => {
    // Local storage'dan yemekleri yükle (geçici olarak)
    const kayitliYemekler = getirYemekler();
    setYemekler(kayitliYemekler);
    
    // Supabase'den kullanıcının yemeklerini çek
    getirKullaniciYemekleri();
    
    // Hazır yemekleri Supabase'den çek
    const getirHazirYemekler = async () => {
      const { data, error } = await supabase
        .from('yemekler')
        .select('*');
      
      if (error) {
        console.error('Hazır yemekler yüklenirken hata:', error);
        return;
      }
      
      setHazirYemekler(data || []);
    };
    
    getirHazirYemekler();
  }, []);

  // Yemeklerin değişikliği local storage'a kaydedilir
  useEffect(() => {
    kaydetYemekler(yemekler);
  }, [yemekler]);

  const yemekAra = (aramaMetni: string): YemekVeritabani[] => {
    const kucukHarfArama = aramaMetni.toLowerCase().trim();
    return hazirYemekler.filter(yemek => 
      yemek.ad.toLowerCase().includes(kucukHarfArama)
    );
  };

  const yemekEkle = (yeniYemek: Omit<Yemek, 'id'>) => {
    const yemek: Yemek = {
      ...yeniYemek,
      id: rastgeleId()
    };
    setYemekler(oncekiYemekler => [...oncekiYemekler, yemek]);
    
    // Yeni eklenen yemek için Supabase veritabanını güncellemeye gerek yok
    // çünkü YemekEklemeFormu.tsx içinde zaten Supabase'e kaydediyorsunuz
  };

  const yemekGuncelle = (id: string, guncelYemek: Partial<Yemek>) => {
    setYemekler(oncekiYemekler =>
      oncekiYemekler.map(yemek =>
        yemek.id === id ? { ...yemek, ...guncelYemek } : yemek
      )
    );
    
    // Supabase veritabanını da güncelle
    supabase
      .from('kullanici_yemekleri')
      .update({
        yemek_adi: guncelYemek.ad,
        birim: guncelYemek.birim,
        porsiyon: guncelYemek.porsiyon,
        kalori: guncelYemek.kalori,
        protein: guncelYemek.protein,
        karbonhidrat: guncelYemek.karbonhidrat,
        yag: guncelYemek.yag,
        tarih: guncelYemek.tarih,
        ogun: guncelYemek.ogun
      })
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error('Yemek güncellenirken hata:', error);
        }
      });
  };

  const yemekSil = (id: string) => {
    setYemekler(oncekiYemekler =>
      oncekiYemekler.filter(yemek => yemek.id !== id)
    );
    
    // Supabase veritabanından da sil
    supabase
      .from('kullanici_yemekleri')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) {
          console.error('Yemek silinirken hata:', error);
        }
      });
  };

  const bugunYemekler = () => {
    return yemekler.filter(yemek => yemek.tarih === bugunTarih());
  };

  const bugunToplamKalori = () => {
    return bugunYemekler().reduce((toplam, yemek) => toplam + yemek.kalori, 0);
  };

  const bugunToplamBesinDegerleri = () => {
    const bugunYenenYemekler = bugunYemekler();
    return {
      protein: bugunYenenYemekler.reduce((toplam, yemek) => toplam + (yemek.protein || 0), 0),
      karbonhidrat: bugunYenenYemekler.reduce((toplam, yemek) => toplam + (yemek.karbonhidrat || 0), 0),
      yag: bugunYenenYemekler.reduce((toplam, yemek) => toplam + (yemek.yag || 0), 0)
    };
  };

  const ogunlereGoreYemekler = () => {
    const bugunYenenYemekler = bugunYemekler();
    return {
      'Kahvaltı': bugunYenenYemekler.filter(yemek => yemek.ogun === 'Kahvaltı'),
      'Öğle Yemeği': bugunYenenYemekler.filter(yemek => yemek.ogun === 'Öğle Yemeği'),
      'Akşam Yemeği': bugunYenenYemekler.filter(yemek => yemek.ogun === 'Akşam Yemeği'),
      'Ara Öğün': bugunYenenYemekler.filter(yemek => yemek.ogun === 'Ara Öğün')
    };
  };

  const gunlukOzet = (gun = bugunTarih()) => {
    return hesaplaGunlukOzet(gun, yemekler);
  };

  const sikKullanilanYemekler = () => {
    const yemekFrekansi: Record<string, number> = {};
    
    yemekler.forEach(yemek => {
      const anahtar = yemek.ad.toLowerCase();
      yemekFrekansi[anahtar] = (yemekFrekansi[anahtar] || 0) + 1;
    });
    
    const benzersizYemekler = yemekler.reduce<Record<string, Yemek>>((acc, yemek) => {
      const anahtar = yemek.ad.toLowerCase();
      if (!acc[anahtar]) {
        acc[anahtar] = yemek;
      }
      return acc;
    }, {});
    
    return Object.entries(yemekFrekansi)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([ad]) => benzersizYemekler[ad]);
  };

  // Verileri yeniden yükleme fonksiyonu
  const verileriYenile = () => {
    getirKullaniciYemekleri();
  };

  const deger: YemekBaglamiDegerleri = {
    yemekler,
    hazirYemekler,
    yemekAra,
    yemekEkle,
    yemekGuncelle,
    yemekSil,
    bugunYemekler,
    bugunToplamKalori,
    bugunToplamBesinDegerleri,
    ogunlereGoreYemekler,
    gunlukOzet,
    sikKullanilanYemekler,
    verileriYenile // Bu fonksiyonu dışarı vererek ihtiyaç olduğunda yemekleri yeniden çekebilirsiniz
  };

  return (
    <YemekBaglami.Provider value={deger}>
      {children}
    </YemekBaglami.Provider>
  );
};

export const useYemek = () => {
  const baglam = useContext(YemekBaglami);
  if (baglam === undefined) {
    throw new Error('useYemek kancası YemekSaglayici içinde kullanılmalıdır');
  }
  return baglam;
};