import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Region = {
  code: string;
  name: string;
  flag: string;
  vpnCode: string;
  vpnUrl: string;
};

const regions: Region[] = [
  { 
    code: 'BY', 
    name: 'Беларусь', 
    flag: '🇧🇾', 
    vpnCode: 'BY-MSK-5729',
    vpnUrl: 'https://v401608.hosted-by-vdsina.com:2096/sub/TrueVPN_91542836?name=TrueVPN-BY'
  },
  { 
    code: 'RU', 
    name: 'Россия', 
    flag: '🇷🇺', 
    vpnCode: 'RU-SPB-8142',
    vpnUrl: 'https://v401608.hosted-by-vdsina.com:2096/sub/TrueVPN_84729153?name=TrueVPN-RU'
  },
  { 
    code: 'KZ', 
    name: 'Казахстан', 
    flag: '🇰🇿', 
    vpnCode: 'KZ-ALA-3956',
    vpnUrl: 'https://v401608.hosted-by-vdsina.com:2096/sub/TrueVPN_62849371?name=TrueVPN-KZ'
  },
  { 
    code: 'UA', 
    name: 'Украина', 
    flag: '🇺🇦', 
    vpnCode: 'UA-KIV-6283',
    vpnUrl: 'https://v401608.hosted-by-vdsina.com:2096/sub/TrueVPN_51938472?name=TrueVPN-UA'
  },
  { 
    code: 'US', 
    name: 'США', 
    flag: '🇺🇸', 
    vpnCode: 'US-NYC-9417',
    vpnUrl: 'https://v401608.hosted-by-vdsina.com:2096/sub/TrueVPN_73846291?name=TrueVPN-US'
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAutoRegion, setIsAutoRegion] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);
  const [isConnected, setIsConnected] = useState(false);
  const [vpnInput, setVpnInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
      toast.success('Регион изменен на Беларусь 🇧🇾');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRegionChange = (region: Region) => {
    setSelectedRegion(region);
    setIsConnected(false);
    toast.loading('Подключение...');
    setTimeout(() => {
      setIsConnected(true);
      toast.success(`Регион изменен на ${region.name} ${region.flag}`);
    }, 1000);
  };

  const handleVpnConnect = () => {
    const foundRegion = regions.find(r => r.vpnCode === vpnInput.trim());
    if (foundRegion) {
      handleRegionChange(foundRegion);
      setVpnInput('');
    } else {
      toast.error('Неверный VPN код');
    }
  };

  const copyVpnCode = () => {
    navigator.clipboard.writeText(selectedRegion.vpnCode);
    toast.success('VPN код скопирован!');
  };

  const copyVpnUrl = () => {
    navigator.clipboard.writeText(selectedRegion.vpnUrl);
    toast.success('VPN ссылка скопирована!');
  };

  const navItems = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'region', icon: 'Globe', label: 'Регион' },
    { id: 'settings', icon: 'Settings', label: 'Настройки' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
    { id: 'about', icon: 'Info', label: 'О приложении' },
    { id: 'help', icon: 'HelpCircle', label: 'Помощь' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="container max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">TikTok Mod</h1>
          <p className="text-muted-foreground">Версия 14.0.5</p>
        </div>

        {activeSection === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <Card className="glass p-6 border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Статус подключения</h2>
                {isConnected ? (
                  <div className="pulse-glow rounded-full w-3 h-3 bg-primary"></div>
                ) : (
                  <div className="rounded-full w-3 h-3 bg-muted animate-pulse"></div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedRegion.flag}</div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{selectedRegion.name}</p>
                  <Badge variant={isConnected ? 'default' : 'secondary'} className="mt-2">
                    {isConnected ? 'Подключено' : 'Подключение...'}
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="glass p-6 border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Zap" className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">Автосмена региона</p>
                    <p className="text-sm text-muted-foreground">При запуске приложения</p>
                  </div>
                </div>
                <Switch checked={isAutoRegion} onCheckedChange={setIsAutoRegion} />
              </div>
            </Card>

            <Card className="glass p-6 border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Key" size={20} />
                VPN Код
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-muted/20 rounded-lg p-3 font-mono text-lg text-center">
                  {selectedRegion.vpnCode}
                </div>
                <Button onClick={copyVpnCode} size="icon" variant="outline">
                  <Icon name="Copy" size={18} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Используйте этот код для подключения к VPN
              </p>
            </Card>

            <Card className="glass p-6 border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Link" size={20} />
                VPN Подписка
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-muted/20 rounded-lg p-3 font-mono text-xs break-all">
                  {selectedRegion.vpnUrl}
                </div>
                <Button onClick={copyVpnUrl} size="icon" variant="outline">
                  <Icon name="Copy" size={18} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Ссылка для импорта конфигурации VPN
              </p>
            </Card>

            <Card className="glass p-6 border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Terminal" size={20} />
                Быстрое подключение
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Введите VPN код"
                  value={vpnInput}
                  onChange={(e) => setVpnInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVpnConnect()}
                  className="bg-muted/20 border-border"
                />
                <Button onClick={handleVpnConnect} className="bg-primary hover:bg-primary/90">
                  <Icon name="Play" size={18} />
                </Button>
              </div>
            </Card>

            <Card className="glass p-6 border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={20} />
                Статистика
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">47</p>
                  <p className="text-sm text-muted-foreground">Переключений</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">12ч</p>
                  <p className="text-sm text-muted-foreground">Активность</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'region' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold mb-4">Выбор региона</h2>
            {regions.map((region) => (
              <Card
                key={region.code}
                className={`glass p-4 border-border cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedRegion.code === region.code ? 'border-primary' : ''
                }`}
                onClick={() => handleRegionChange(region)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{region.flag}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{region.name}</p>
                    <p className="text-sm text-muted-foreground">{region.code}</p>
                    <p className="text-xs text-primary font-mono mt-1">{region.vpnCode}</p>
                  </div>
                  {selectedRegion.code === region.code && (
                    <Icon name="CheckCircle" className="text-primary" size={24} />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold mb-4">Настройки</h2>
            <Card className="glass p-4 border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon name="Bell" size={20} />
                  <span>Уведомления</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={20} />
                  <span>Безопасный режим</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Wifi" size={20} />
                  <span>Авто-подключение</span>
                </div>
                <Switch checked={isAutoRegion} onCheckedChange={setIsAutoRegion} />
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold mb-4">Профиль</h2>
            <Card className="glass p-6 border-border text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                <Icon name="User" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-1">Пользователь</h3>
              <p className="text-muted-foreground mb-4">user@tiktok.mod</p>
              <Badge>Premium</Badge>
            </Card>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold mb-4">О приложении</h2>
            <Card className="glass p-6 border-border">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold gradient-text mb-2">TikTok Mod</h3>
                <p className="text-muted-foreground">Версия 14.0.5</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дата сборки</span>
                  <span>30.10.2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Лицензия</span>
                  <span>Premium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Поддержка</span>
                  <span>Активна</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'help' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold mb-4">Помощь</h2>
            <Card className="glass p-4 border-border">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="MessageCircle" size={20} className="text-primary" />
                <span className="font-semibold">Как изменить регион?</span>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                Перейдите в раздел "Регион" и выберите нужную страну из списка.
              </p>
            </Card>
            <Card className="glass p-4 border-border">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="MessageCircle" size={20} className="text-primary" />
                <span className="font-semibold">Автосмена не работает?</span>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                Убедитесь, что функция включена в настройках на главном экране.
              </p>
            </Card>
            <Card className="glass p-4 border-border">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="MessageCircle" size={20} className="text-primary" />
                <span className="font-semibold">Техподдержка</span>
              </div>
              <p className="text-sm text-muted-foreground pl-8">
                Напишите нам: support@tiktokmod.app
              </p>
            </Card>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-border">
        <div className="container max-w-md mx-auto px-2 py-3">
          <div className="grid grid-cols-6 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;