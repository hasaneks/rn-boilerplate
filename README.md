# React Native Boilerplate

<div align="center">
  <b>🌍 Choose Language / Dil Seçimi</b><br />
  <a href="#english-">🇬🇧 English</a> • <a href="#türkçe-">🇹🇷 Türkçe</a>
</div>

---

## English 🇬🇧

🚀 **A production-ready, modular and scalable React Native boilerplate.**

[**React Native**](https://reactnative.dev) Boilerplate was built using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

### 📁 Project Folder Structure

```
src/
├── api/              # RTK Query services and API interfaces
├── assets/           # Images, fonts, icons, etc.
├── components/       # Reusable UI components
├── constants/        # Constants like colors, sizes
├── hooks/            # Custom React hooks
├── navigation/       # Navigation stack and tab configs
├── pages/            # Screens / views
├── redux/            # Store, slices, middleware
├── services/         # Firebase, Notifee, Ads, etc.
├── styles/           # Global styles and theming
├── translations/     # i18n files and configuration
├── utils/            # Utility/helper functions
```

### 📦 Packages Used

- `react-native-mmkv` — Fast and efficient local storage
- `@reduxjs/toolkit`, `react-redux`, `@reduxjs/toolkit/query`, `axios`
- `@react-native-firebase/*`, `@notifee/react-native`
- `i18next`, `react-i18next`, `react-native-localize`, `i18next-http-backend`
- `react-navigation`, `react-native-screens`, `react-native-gesture-handler`
- `react-native-svg`, `react-native-toast-message`, `react-native-fast-image`
- `lottie-react-native`, `@gorhom/bottom-sheet`

### 🚀 Installation

```bash
git clone https://github.com/yourname/react-native-boilerplate.git
cd react-native-boilerplate
yarn install
cd ios && pod install && cd ..
yarn ios # or yarn android
```

### 🛠️ Project Customization

#### 1. Rename Project and Bundle ID

```bash
yarn global add react-native-rename
react-native-rename "MyApp" -b com.mycompany.myapp
```

Check manually:
- `android/app/src/main/AndroidManifest.xml`
- `android/app/build.gradle`
- `ios/MyApp/Info.plist`

#### 2. Firebase Setup

- `google-services.json` → place under `android/app/`
- `GoogleService-Info.plist` → place under `ios/{AppName}/`

#### 3. .env Configuration

```env
API_URL=https://api.example.com
```

### 🌐 Language Support

- Auto-detect with `react-native-localize`
- Local + remote JSON support
- Persisted with MMKV (**pending**)

### 🔔 Notifications (Pending)

- FCM token via Firebase
- Advanced local notifications via Notifee

### 🧪 API Usage Example

```ts
const { data: posts } = useGetPostsQuery()
const [addPost] = useAddPostMutation()
```

### 🎨 Icon Package

- [Iconsax Line Oval Icon](https://www.svgrepo.com/collection/iconsax-line-oval-icons/)
- [Iconsax Line Bold Oval Icon](https://www.svgrepo.com/collection/iconsax-bold-oval-icons/)

### 🤝 Contributing

Open to PRs and issues. Let’s make it better together!


---

## Türkçe 🇹🇷

🚀 **Üretime hazır, modüler ve güçlü bir React Native başlangıç yapısı.**

[**React Native**](https://reactnative.dev) Boilerplate, [`@react-native-community/cli`](https://github.com/react-native-community/cli) kullanılarak hazırlanmıştır.

### 📁 Proje Klasör Yapısı

```
src/
├── api/              # RTK Query servisleri ve API arayüzleri
├── assets/           # Görseller, fontlar, ikonlar vb.
├── components/       # Ortak UI bileşenleri
├── constants/        # Sabit değerler, renkler, boyutlar
├── hooks/            # Custom hook’lar
├── navigation/       # Navigation yapısı
├── pages/            # Uygulama ekranları
├── redux/            # Store ve slice yapısı
├── services/         # Firebase, Notifee, Ads gibi servisler
├── styles/           # Tema ve genel stil tanımları
├── translations/     # i18n JSON dosyaları ve ayarları
├── utils/            # Yardımcı fonksiyonlar
```

### 📦 Kullanılan Bazı Paketler

- `react-native-mmkv` — Hızlı local storage
- `@reduxjs/toolkit`, `react-redux`, `@reduxjs/toolkit/query`, `axios`
- `@react-native-firebase/*`, `@notifee/react-native`
- `i18next`, `react-i18next`, `react-native-localize`, `i18next-http-backend`
- `react-navigation`, `react-native-screens`, `react-native-gesture-handler`
- `react-native-svg`, `react-native-toast-message`, `react-native-fast-image`
- `lottie-react-native`, `@gorhom/bottom-sheet`

### 🚀 Kurulum

```bash
git clone https://github.com/kullanici/react-native-boilerplate.git
cd react-native-boilerplate
yarn install
cd ios && pod install && cd ..
yarn ios # veya yarn android
```

### 🛠️ Proje Özelleştirme

#### 1. Proje İsmini ve Bundle ID'yi Değiştirme

```bash
yarn global add react-native-rename
react-native-rename "MyApp" -b com.mycompany.myapp
```

> Bu işlem Android ve iOS tarafında proje adı ve bundle ID'yi değiştirir.

Ardından aşağıdaki dosyaları kontrol edin:
- `android/app/src/main/AndroidManifest.xml`
- `android/app/build.gradle`
- `ios/MyApp/Info.plist`

#### 2. Firebase Ayarları

- `google-services.json` → `android/app/` klasörüne
- `GoogleService-Info.plist` → `ios/{AppName}/` klasörüne

#### 3. .env Ayarları

```env
API_URL=https://api.example.com
```

### 🌐 Dil Desteği

- `react-native-localize` ile cihaz dili otomatik algılanır
- Dil dosyaları local ve remote olarak yüklenebilir
- Seçilen dil MMKV ile saklanabilir (**Henüz yapılmadı**)

### 🔔 Bildirim Sistemi (Henüz Eklenmedi)

- Firebase Messaging ile FCM token alma
- Notifee ile gelişmiş local bildirim

### 🧪 API Kullanım Örneği

```ts
const { data: posts } = useGetPostsQuery()
const [addPost] = useAddPostMutation()
```

### 🎨 İkon Paketi

- [Iconsax Line Oval Icon](https://www.svgrepo.com/collection/iconsax-line-oval-icons/)
- [Iconsax Line Bold Oval Icon](https://www.svgrepo.com/collection/iconsax-bold-oval-icons/)

### 🤝 Katkıda Bulun

Her türlü PR ve issue'ya açığım. Gelin birlikte daha iyi hale getirelim!


