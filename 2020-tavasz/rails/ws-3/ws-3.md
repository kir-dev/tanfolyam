# WS-3

## Előkészületek

A project az előző workshop-on készítet project folytatása. A ws-1/restaurant mappa clone-ozása után követhető a leírás.

## Active Storage 

A weboldalak elégg üresek, ha nincsenek rajta képek,videók, egyéb multimédiás tartalmak. Ezek feltöltésére ad lehetőséget az Active Storage. Az alábbi paranccsal tudjuk hozzáadni a projectünkhöz.

```sh
rails active_storage:install
```

Ez elkészíti a képek adatbázisban történő tárolásához szükséges migrációkat. Futtassuk is le ezeket.

```sh
rails db:migrate
```

Nézzük meg a storage.yml-t. Itt látjuk, hogy a képek elhelyezése a helyi gépre van beállítva. A projecten belül a storage mappába lesznek elhelyezve a képek. Megadhatnánk külső tárhelyet valamelyik szolgáltatónál (AWS, Azure), de az egyszerűség kedvéért, maradjunk a lokális tárolásnál.

```yml
config/storage.yml

local:
  service: Disk
  root: <%= Rails.root.join("storage") %>
```

A következő lépésként adjuk hozzá a food model-hez, a photo attribútumot, a kép tárolására. 

```ruby
app/models/foods.rb

has_one_attached :photo
```

Mostmár tudja az alkalmazásunk tárolni a képeket. A következő lépés, hogy ténylegesen fel is lehessen tölteni képeket. Ehhez a már meglévő form-hoz kell egy új mezőt felvenni.

```erb
  app/views/foods/_form.html.erb

  <%= f.file_field :photo %>
```
Ha ezt hozzáadtuk a form-hoz, akkor már be tudjuk küldeni a képet, de mivel a Food Controller nem veszi át a photo paramétert, ezért nem kerül elmentésre. Egészítsük ki az elfogadott paraméterek listáját!

```erb
app/controllers/foods_controller.rb
(A food-params függvényt írjuk át az alábbira.)

params.require('food').permit('name', 'price', 'photo')
``` 
Igy már elmentődik a kép is. A megjelnítés előtt meg kell néznünk, hogy van csatolt kép a modelhez, vagy nincs. Ha nem ellenőriznénk, hogy csatoltak-e képet az adott ételhez, akkor ArgumentError-t kapnánk, az olyan ételek megjelenítésénél, ahol nincsenek képek. Ez azért történik, mert egy nil objetkumnak az url-jét szeretnénk megkapni, ami nem igazán lehetéges. 

```erb
app/views/foods/show.html.erb

<%  if @food.photo.attached? %>
  <%= image_tag(@food.photo) %>
<% end %>
```

Ha feltöltünk egy nagyobb felbontású képet, akárcsak egy képernyőfelvételt, akkor észrevehetjük, hogy eléggé érdekesen fog kinénzni, a show view-ban a kép. Alapvetően a képek a feltöltésnek megfelelő felbontásban kerülnek megjelenítésre, ami nem minden esetben megfelelő. Jó lenne, ha egy adott oldalon, a képek mindig az általunk meghatározott méretben szerepelnének. Szerencsére erre is vannak gem-ek.

```ruby
Gemfile 

gem 'image_processing', '~> 1.2'
gem 'mini_magick'
```
Miután felvettük a Gemfile-ba adjuk ki az álábbi parancsot, hogy tényleg letöltésre kerüljön a gem.

```sh
bundle install
```

Majd egészítsük ki az image_tag-et, az átméretezéssel. A variant függvény megjeleníti a paramétereiben meghatározott feltételeknek megfelelő képet. Jelen esetben egy olyan képet fog megjeleníteni, ami belefér egy 400x400-as négyzetbe.(nem feltétlen tölti, ki az eredeti méretarányok megmaradnak)  

```erb
app/views/foods/show.html.erb

<%  if @food.photo.attached? %>
  <%= image_tag(@food.photo.variant(resize_to_limit: [400, 400])) %>
<% end %>
```

## Második modell, az összetevők

Egy étterem olalán elképzelhetünk egy olyan feature-t, hogy tároljuk minden ételnek az összetevőit. Ehhez fel kell vennünk egy új modelt, view-et és controller-t. Ezt megtehetjük a második WS-en látott módon is, de scaffold generálással sokkal gyorsabban elérhetjük, ugyan azt.

```sh
rails generate scaffold ingredient name:string
```

A fenti parancs létrehozott nekünk egy model-t, a hozzátartozó alapvető view-eket, és egy controllert is, ahol az alap action-ök már implementálva is vannak. Mivel létrehoztunk egy model-t is, aminek példányait szerertnék adatbázisba elmenteni, szükséges futtatnunk a migrációkat is.

```sh
rails db:migrate
```

Ezután a modellekben meg kell adnunk az asszociációt. Mivel egy ételnek több összetevője van és egy összetevő is szerepelhet több ételben, ezért több-több kapcsolatot kell létrehozni. A kapcsolatot mindkét irányból, szeretnénk használni, ezért kell mindkét model-nél definiálni. Ezt az alábbi sorok hozzáadásával lehet megtenni.

```ruby
app/models/food.rb

has_and_belongs_to_many :ingredients  
```

```ruby
app/models/ingredient.rb

has_and_belongs_to_many :foods
```

Nézzük meg rails console-ban, hogy sikeresen létre jött-e a kapcsolat.

```diff
Ingredient.first.foods
- ActiveRecord::StatementInvalid (Could not find table 'foods_ingredients')
```
A console-ból az **exit** utasítással tudunk kilépni.

Fent megpróbáljuk lekérni az első összetevőhöz tartozó ételeket. Erre egy érdekes hibát kapunk. Ami a kapcsolótábla hiányára figyelmeztet. Ami furcsa lehet, hiszen előbb már definiáltunk egy kapcsolatot a modellek között. Ez igaz, de ott csak a ruby-s objectet között lett kapcsolat létrehozva. A kapcsolatok példányai is adatbázis rekordokként vannak tárolva, ezekhez kell a kapcsoló tábla.

```shell script
rails generate migration CreateJoinTableFoodIngredient food ingredient 
```

A fenti parancs létrehozza a modelleket reprezentáló táblák közötti kapcsolótáblát. Ezt ú tudja megtenni, hogy ha a migráció nevében benne van 'JoinTable' string, akkor ilyen fajta migrációt csinál. Hogy melyik két táblát kell join-olni, azt az utána megadott két modellnév alapján dönti el.

```sh
rails db:migrate
```

Most se felejtsük el lefuttatni a migrációkat.

Ha a kapcsolatok sikeresen létrejöttek, akkor meg kéne oldanunk,hogy vamilyen módon, meg tudjuk adni, hogy egyes ételekhez milyen összetevők tartoznak. Erre jó megoldás lehet, ha check boxokat használunk. 

```erb
app/views/foods/_form.html.erb
 <ul>
    <% ingredients = @food.ingredients.to_a %>
    <% Ingredient.all.each do |ingredient| %>
      <li>
        <%= ingredient.name %>
        <%= check_box_tag "food[ingredients][]", ingredient.id, ingredients.include?(ingredient) %>
      </li>
    <% end %>
  </ul>  
```
Ezeket a fenti módon hozzá tudjuk adni a form-hoz. A chex_box_tag első paramétere határozza meg, hogy a params hash-be milyen kulcsokkal kerül felvételre az adott mező.  Az utolsó üres szögletes zárójel teszi lehetővé, hogy listát küldjünk be. Ez azért fontos,mert ha nem listát küldünk,akkor csak az utolsó megadadott kulcsú elem kerülne beküldésre, valamit amikor átvesszük a paramétereket a controllerben, ott is meg kell adnunk,hogy egy listát szeretnénk fogani. A második paramétere a tagnek, a html value option értékét állítja be, ami nem más mint a tényleges érték, ami az adott check_box bepipálása esetén, postolás után, megjelenik az ingredients hash-ben. Az utolsó paraméterben a check_box kezdeti állapotát tudjuk meghatározni, hogy betöltéskor be van-e pipálva vagy nincs. Ennek eldöntéséhez nézzük meg, hogy az adott ingredient, benne van a @food.ingredients listában. 


Ennek a listának az elkészítését érdemes a ciklus elé tenni és egy külön változóban eltárolni. Ha megnézzük, ebben a változóban egy ActiveRecord::Associations::CollectionProxy típusú object van, ami azért lényeges, mert így minig, amikor ezt a változót használjuk, egy kérést generálunk az adatbázisnak, ami nem túl jó. A to_a függvénnyel érdemes Array tipusúra alkítani, hogy elkerüljük az N+1 query-t. A check_box-ok állapotának meghatározása majd az update-nál lesz hasznos. Egy példa a form POST-olásakor létrejövő food hash-re. 

```shell script
"food"=>{"name"=>"Alma", "price"=>"232", "ingredients"=>["2", "3", "4"]}
```
Már a controllerhez eljutnak a form-ból az értékek. Hogy dolgozhassunk az ingredients listával, fel kell vennünk az engedélyezett paraméterek közé. Ezután észrevehetjük, hogy ez a list csak a kiválaszott összetevők id-ját tartalmazza. De a create/update függvény konkrét Ingredient példányok listáját várja az ingrdients attribútumhoz. Ezért az id-k alapján kikeressük ezeket az adatbázisból, és felül irjuk velük a korábbi paramétereket. Az utolsó sorban pedig vissza adjuk az elkészült paramétereket

```shell script
def food_params
    parameters = params.require('food').permit('name', 'price', 'photo', ingredients: [])
    parameters[:ingredients] = Ingredient.where(id: parameters[:ingredients]).to_a
    parameters
end
```
Ezután a szokásos módon kiírhatjuk az egy ételhez tartozó összetevőket.

```erb
app/views/foods/show.html.erb

<h2>Összetevők:</h2>
<ul>
  <% @food.ingredients.each do |ingredient| %>
    <li>
      <%= ingredient.name %>
    </li>
  <% end %>
</ul>

```

## Tesztadatok

Eddig fárasztó konzolos parancsokkal, vagy klines-oldalon vettük fel az adatokat az adatbázisunkba. A fejlesztés során haszos lehet, ha nagyobb mennyiségű tesztadatokkal töltjük fel az adatbázist. Erre kéne egy gyorsabb megoldás. Szerencsére van ilyen. Ez nem más mint a seeds. Ezt használva ruby-ban írt kóddal generálhatunk több adatot. Felhasználjuk még a Faker gem-et is, ez biztosít random generált neveket, egy általunk választott kategóriában, amikkel feltölthetjük az adatbázisunkat..

Elösször adjuk a gemfile-hoz a faker gem-et  

```shell script
gem 'faker', '~> 2.10', '>= 2.10.2'
```

Majd futtassuk az alábbi parancsot

```sh
bundle install
```

Majd a seeds.rb fileba másoljuk be az alábbi sorokat, amik létrehoznak néhány tesztadatot.


```ruby
db/seeds.rb
# require 'faker' 

ingredient_num = 10
puts 'Generating ingredients: '
ingredient_num.times do |index|
  Ingredient.create(name: Faker::Food.ingredient)
  puts "#{index + 1}/#{ingredient_num}"
end

food_num = 20
puts 'Generating foods: '
food_num.times do |index|
  ingredients = ingredient_num.times.to_a.sample(rand(1..ingredient_num))
  ingredients = Ingredient.where(id: ingredients)
  Food.create(name: Faker::Food.dish, price: rand(100..1000), ingredients: ingredients)
  puts "#{index + 1}/#{food_num}"
end
```

És adjuk ki az alábbi parancsokat. Az első letölti az új gem-et, a második pedig lefuttatja a seeds.rb tartalmát?

```sh
bundle install

rails db:seed
```
Senkit ne ijesszen el a fenti kód, ez csak a mostani speciális adatstruktúránk, miatt ilyen komplex. Alapesetben egy ciklus elég szokott lenni, aminek a magja is csak 1 sor. Annyi történik, hogy létrehozzuk az adott számú összetevőt, a Faker gem által biztosított nevekkel. Majd az ételeket is létrehozzuk és hozzájuk társítjuk a véletlenszerűen választott összetevőket.

## Bejelentkezés

A legtöbb oldalnak alapvető funkciója, hogy a felhasználók tudnak regisztrálni és belépni. Valamint általában az oldalak egyes funkcióit is bejelntkezéshez kötik. A bejelentkezésre és autentikációra is van egy remek gem, ez nem más, mint a devise. Adjuk hozzá ezt a Gemifle-hoz.

```ruby
Gemfile

gem 'devise', '~> 4.7', '>= 4.7'
```

Majd adjuk ki az alábbi parancsot, hogy a rails generator létrehozza nekünk az devise működéséhez szükséges file-okat.

```shell script
rails generate devise:install
```
Ha a fenti parancs lefutott, generáljunk egy devise modelt user névvel.

```shell script
rails generate devise user
```

Végül futtasuk le a migrációkat, hogy az adatbázisban is létrejöjjön a megfelelő model.

```shell script
rails db:migrate
```

Ha a megnézzük az utakat, akkor látjuk, hogy sok mindent létrehozott nekünk a devise. Ezekre az címekre kell csak kéréseket küldenünk, hogy a userek állapotát kezeljük. Hozzunk létre az oldal tetején a bejelentkezés és kijelentkezést bitosító linkeket. Valamint helyezzünk el mezőket, ahová a bejelnetkezéssel kapcsolatos 0

```erb
app/views/layouts/application.html.erb

<% if user_signed_in? %>
  <%= current_user.email %>
  <%= link_to 'Sing out', destroy_user_session_path, method: :delete %>
<% else %>
  <%= link_to 'Sign in', new_user_session_path %>

<% end %>

<p class="notice"><%= notice %></p>
<p class="alert"><%= alert %></p>
```

A fenti kódrészletben érdemes megfigyelni a user_signed_in? és current_user helpereket. Ezek segítségével eldönthető, hogy van-e bejelentkezett felhasználó valamint, valamint az adatai is elérhetők.

Mostmár, hogy be tudunk lépni, meg tudjuk oldani, hogy egyes controller action-ök, csak bejelentkezés után legyenek elérhetők. Tegyük ilyenné az étel szerkeztést és törlést!

```ruby
app/controllers/foods_controller.rb

before_action :authenticate_user!, only: %i[edit destroy]
``` 
Ez a fenti sor hozzáadásával tehetjük meg.

## Részletesebb leírás / minőségi forrás:
https://guides.rubyonrails.org/
