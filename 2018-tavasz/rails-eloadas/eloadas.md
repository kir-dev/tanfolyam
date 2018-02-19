# Ruby on Rails
## Geri
## Kir-Dev 2018

---

# A nyelv
- Interpretált
- Dinamikus
- Objektumorientált
- Olvasható szintaxis
      2.days.ago

---

# Típusok
- Gyengén és dinamikusan típusos
 - (lásd Javascript)
- Alaptípusok: number, string, array, hash, _symbol_
- `undefined` és `null` helyett `nil`
- Nincs automatikus konverzió

---

# Operátorok
- \+ , - , * , / , = , ==
- `defined? valtozo`
- if, unless
      b = 10 if a < 5
- Komment: # a sor elején

---

## Elágazások, függvények
      if/unless arg
        ...
      end

      def fuggveny(param)
        ... 
      end

      while arg
        ...
      end

      for item in array
        ...
      end


---

## Objektumorientáltság
    class Student < Person
  
      @@learners = 0
  
      def initialize(name, intelligence)
        @intelligence = intelligence
        @@learners += 1
      end
  
      def learn
        @intelligence += 5
      end
  
      def self.count
        @@learners
      end
  
    end


---

# Blokkok
- Gyakorlatilag kódrészlet
- Átadható függvénynek
- `{ ... }`
- Vagy paraméterrel `{ |param1, param2 | ... }`

---

# Rails

---

## Kitekintés: Az adatbázis
Miért jobb, mint egy file-ban tárolni az adatokat?

- Queryk
- Indexelés
- Hálózaton keresztül elérés
- Párhuzamosítás

Rails egyik dolga hogy nagyrészt elrejtse az egészet

---

# MVC
- Alkalmazás struktúrálása
- Model-View-Controller
- Model
 - Beszél az adatbázissal
 - Üzleti logika
- View
 - Megjelenítés
 - Passzív
- Controller
 - Összeköti a felső kettőt egymással és a felhasználóval

---

## Request processing
![mvc](mvc.png)

---

## Request processing
### Router

    get "users", to: "users#index"

 - http://webhely.hu/users
 - UsersController index függvénye


    get "users/:id", to: "users#show"

- http://webhely.hu/users/2512
- Az id-t megkapja a függvény

---

## Request processing
- Convention over configuration
- Fileok és mappák elnevezése
- Nehezebb beletanulni, később kényelmes

---

# A Modell
- Adatbáziskapcsolat
- Alkalmazáslogika


    class Person
      self.table_name = :people
      self.primary_key = :id

      def full_name
        first_name + last_name
      end
    end

---

## Modellek használata
### Lekérdezés

      Person.find(10)     #Id alapján, exception ha nincs

      Person.find_by(first_name: 'Sándor')   #Első amire igaz

      Person.all.each do |person|      #Végigiterálás
        Newsletter.deliver_to(person)
      end

      Person.where(gender: female)     #Mindet visszaadja

      Person.order(birth_date: :asc).limit(10)  #10 legidősebb user


---

## Modellek használata
### Új rekordok

      p = Person.new
      p.name = 'Gajdos Sándor'
      p.save

      #Vagy rövidebben
      Person.create(name: 'Gajdos Sándor')

---

## Modellek használata
### Módosítás

      dave = Person.find_by(first_name: 'Dávid', last_name: 'Kiss')
      dave.nick_name = 'Dave'
      dave.save

      #Vagy rövidebben
      dave = Person.find_by(first_name: 'Dávid', last_name: 'Kiss')
      dave.update(nick_name: 'Dave')

      #Törlés
      dave.destroy

---

## Controllerek röviden

- Egy függvény egy oldalnak/akciónak felel meg
- A végén renderel egy view-t vagy átirányít

      render 'edit'
      redirect_to root_path
      redirect_to @user

- Ha nincs explicit render/redirect, akkor rendereli a nevének megfelelőt
 - ProfilesController#show -> views/profile/show.html.erb

---

## Controllerek röviden
- Beérkező adat: params hash

      params[:user_id]

- Params hash-ben van az url paraméter, a form adat és a query string is
- Cookies hash írható/olvasható

      cookies[:remember_me] = true

---

## Controllerek röviden

    class StudentsController < ApplicationController

      def index
      end
  
      def create
        Student.create(neptun: params[:neptun])
      end
  
      def destroy
        Student.destroy(params[:id])
        redirect_to root_path
      end

    end

---

## Gemek
- Package manager
- Funkcionalitások behúzása kívülről
- Pl.: authentikáció

      gem 'devise'

      # Terminálból:
      bundle install

---

## Debugolás
- better_errors gem
 - Hiba esetén a böngészőben nyit egy konzolt
 - Kényelmes, gyors
- byebug gem
 - Terminálos debugolás
 - Gyakorlottabb fejlesztőknek :)
