# MentorApp

Bu proje, kullanıcıların etkileşimde bulunabileceği, içerik paylaşabileceği ve topluluklarla bağlantı kurabileceği modern bir web sitesini temsil etmektedir. Uygulama, kullanıcı kaydı, profil yönetimi, blog yazıları oluşturma ve sohbet etme katılma gibi temel özellikleri sunmaktadır.

Özellikler:
- Chat: Gerçek zamanlı sohbet odaları ile kullanıcılar arasındaki anlık iletişim.
- Blog: Kullanıcıların blog yazıları oluşturabileceği bölüm.
- Signup: Kullanıcıların yeni hesap oluşturabileceği kayıt ekranı.
- Profile: Kullanıcıların kendilerine ait profillerini görüntüleyip, düzenleyebileceği sayfa.
- Community: Kullanıcıların farklı kişileri bulabileceği ve sohbet başlatabileceği sayfa.


Kullanılan Teknolojiler

Frontend

React.js: Kullanıcı arayüzünü oluşturmak için kullanılan JavaScript kütüphanesi.
TypeScript: JavaScript'in statik tip denetimi sunan üst kümesi. Uygulama geliştiricilerine daha güvenli ve hatasız kod yazma imkanı sunar.
Material UI: UI bileşenleri için kullanılan popüler bir kütüphane.
Redux: Uygulamanın durum yönetimi için kullanıldı.
Axios: Backend API ile iletişim kurmak için HTTP istemcisi.
Sass: CSS yazımı için kullanılan güçlü bir stil dilidir.
React Virtualized: Uzun listeleri ve tablolara performans optimizasyonu sağlar.
Yup: Form doğrulama için kullanılan bir şemadır.
WebSocket: Gerçek zamanlı chat ve anlık güncellemeler için kullanıldı.

Backend

Django: Backend geliştirmek için kullanılan Python tabanlı web framework.
Django REST Framework: API geliştirme için kullanılan güçlü bir Django uzantısı.
Django Channels: WebSockets ve asenkron işlemleri destekler.
PostgreSQL: Veritabanı yönetim sistemi olarak kullanıldı.
Django Allauth ve Dj-rest-auth: Kullanıcı yönetimi ve kimlik doğrulama için kullanıldı.
Pandas ve OpenPyXL: Veri işleme ve Excel dosyalarıyla çalışma için kullanıldı.
Django CORS Headers: Cross-origin kaynak paylaşımını yönetmek için kullanıldı.
Django Redis: Redis ile veritabanı önbellekleme ve asenkron görevler için kullanıldı.

Docker

Proje, geliştirme ve üretim ortamları için Docker ile kapsayıcılara ayrılmıştır. Docker Compose kullanılarak tüm bileşenler bir arada çalışacak şekilde yapılandırılmıştır. Bu, her iki ortamda da tutarlı bir çalışma deneyimi sağlar ve uygulamanın taşınabilirliğini artırır.
