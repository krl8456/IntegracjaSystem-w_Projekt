# Projekt zaliczenowy na przedmiot "Integracja Systemów"

Temat projektu: Zestawianie danych na temat minionych i trwających konfliktów zbrojnych z cenami surowców.

Skład grupy projektowej: 
  - Karol Rak (autentykacja, API do zarządzania kontem, import/export danych)
  - Weronika Potępa (wyszukiwanie i przygotowanie danych, prezentacja danych w postaci wykresów, poziom izolacji dostepu do danych)

Wykorzystane technologie:
  - Laravel
  - MySQL
  - React

Na stronie dostępne są interaktywne wykresy przedstawiające zmiany cen
poszczególnych towarów i usług, spowodowane inwazją Rosji na Ukrainę. 
Po wybraniu na wykresie miesiąca, w którym trwał konflikt (data
rozpoczęcia Luty 2021), pojawi się krótka lista wydarzeń z tego miesiąca.
Funkcje strony są dostępne wyłącznie dla zalogowanych użytkowników.

Źródła wykorzystanych danych:
  - Infopiguła (baza danych wydarzeń)
  - Dziedzinowe Bazy Danych (baza danych cen towarów i usług)

Przykładowe pytania, na które można znaleźć odpowiedzi
wykorzystując przygotowaną aplikację:
  - Jak inwazja Rosji na Ukrainę odbiła się na kosztach usług i produktów wykorzystywanych w gospodarstwach domowych?
  - Co i kiedy wydarzyło się na froncie?

Do prawidłowego działania aplikacji należy w XAMPP uruchomić serwery Apache i MySQL.
Instrukcja wykorzystania aplikacji:
 - backend
    - composer update
    - composer install
    - należy w folderze stworzyć nowy plik .env i przekopiować do niego zawartość z pliku .env.example
    - php artisan key:generate
    - php artisan migrate 
    - php artisan data:import
    - php artisan serve
 - frontend
    - npm install
    - npm run start
