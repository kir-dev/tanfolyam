# Ruby on Rails WS-2

## Bevezetés

**Reques-response cycle**

A kliens http kérést küld a szervernek, amire a szerver válaszol.

**ReST**

Represntational State Transfer

A ReST egy tervezési módszer. Fő alapelvei a kliens-szerver szétválasztása, az állapotmentesség és a réteges felépítés.

**MVC - Model View Controller**

A szerver felelősségei 3 csoportra vannak bontava.

Model: Adatok tárolása, elérése és módosítása.

View: Adatok megjelenítése.

Controller: Kérések feldolgozása. Ehhez használja a model és a view réteget is.

## Project létrehozása

```sh
rails new restaurant
```

létrehoz egy új rails alkalmazást a restaurant névvel

```sh
cd restaurant 
```

átváltja a munkamappát a resturant project mappájára

```sh
code . 
```

ha meg szeretnénk nyitni a Visual Studio Code-ban a mappát, akkor az alábbi paranccsal tehetjük meg

```sh
rails server
```
 
Elindítjuk a rails szervert, majd a böngészőben a localhost:3000 -es címen ellenőrizzük, hogy sikeresen elkészült a projectünk.
Ctrl + c billenyűkombinációval tudjuk leállítani a szervert a terminálban.

## Controller-ek

A router a beérkezett kérés alapján eldönti, hogy melyik conroller action-nek kell továbbítani a kérést. A controller válaszként egy HTML dokumentumot küld vissza.
A controller neve, a konvenció szerint, általában többesszámú, pl.: UsersController, AdminsController. Persze vannak kivételek. (ApplicationController)

```sh
rails generate controller foods
```

A fenti parancs elkészíti a foods nevű kontrollert és az összes hozzá kapcsolódó filet pl.: tesztek, style sheets stb...

A FoodsController-ben definálunk egy about actiont.

```ruby
app/controllers/foods_controller.rb

def about   
end
```

A routes file-fileban felveszünk egy új 'utat'. Ez annyit csinál, hogy a weboldal /about -címére érkező get kéréseket továbbítja a Foods Controller about action-jének.

```ruby
config/routes.rb

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '/about' , to: 'foods#about'

end
```
A /about oldalt nézzük meg a böngészőben.

```http
localhost:3000/about
```
Ha megnyitjuk a fenti címet a következő hibaüzenetet látjuk:

```diff
- FoodsController#about is missing a template for request formats: text/html
```
Ez azért van, mivel az about nem küld vissza HTML-t. Alapesetben, ha explicit nem adunk meg mást, akkor a controller és a függvény neve alapján próbálja megkeresni a megfelelő view-et. Jelen esetben ez hiányzik.

## View-ek

Rails-ben a view-ek, a megjelenítésnek az eszközei. Ezek alapján lesz létrehozva a végleges HTML, amit visszaküld a szerver a kliensnek. A view-ek ERB(Embeded RuBy) fájlokban vannak megadva. Ezek alapvetően HTML dokumentumok, amikbe írhatunk Ruby kódot is.

Hozzuk létre az alábbi fájlt a megadott helyen.
```HTML
app/views/foods/about.html.erb

<h1>About</h1>
<p>This is a view for the Foods Controller's about method.</p>
```

Igy már a /about oldalon nem kapunk hibát, megjelenik a fenti oldal.

## Model-ek

Eddig csak statikus HTML oldalakat adtunk a webolalunkhoz. Szeretnénk dinamiukasan adatokat felvenni, olvasni, frissíteni és törölni. Ezekhez Create-Read-Update-Delete -> **CRUD műveleteket** kell megvalósítani. Első lépésként kell valami, amin keresztül hozzá tudunk férni az adatbázisban tárolt adatokhoz, ez a valami a model. A model az ORM (Object Relational Mapping) Rails-es megvalósítása. Felhasználásával egyszerűen elérhetjük az adatbázisban tárolt adatokat, nem kell (,de lehete) közvetlenül SQL lekérdezéseket használni. A modellek nevei, konvenció szerint, mindig egyesszámban szerepelnek.

```sh
rails generate model food name:string price:integer
```

A fenti parancs létrehoz egy Food modelt, aminek van egy neve(name), ami string tipusú és van egy ára(price), ami integer tipusú. A két fontosabb file lett létrehozva. Az egyik food.rb amiben, a modelhez tartozó függvényeket lehet létrehozni. A másik pedig egy migráció sok_szám_create_foods.rb, aminek a futtatásával végrehajtódnak a változtatások az adatbázisban. Az alábbi módon lehet lefuttatni a migrációt.

```sh
    rails db:migrate
```

Megjegyzés: régi verziókban a rails kulcsszó helyett a rake kulcsszót kellet használni, most mindkettőt lehet használni, a rails javasolt.


```ruby
app/controllers/foods_controller.rb

def index
    @foods = Food.all
end
```
Felveszünk egy új action-t a FoodsController-ben, a fenti módon. Ez lekéri az összes Food tipusú adadtot (egész táblát) az adatbázisból. Ezt @foods változóban leküldi a view-nek.

Ebben a view-ben megismerkedhetünk jobban az **ERB**-vel. Ez nem más, mint Embeded RuBy nyelv. Lényegében annyiról van szó, hogy egy sima HTML tag-ek melett, használhatunk ruby-t is, amivel dinamikusan generálhatunk további HTML-t. A  **<% valmai_ruby_kód %>** tag csak lefuttatja a bennlévő kódot, míg **<%= valami_string_eredményt_ad %>** beilleszti a htmlbe a belső kód visszatérési értékét.

```ERB
app/views/foods/index.html.erb

<h1>Foods Index</h1>

<table>
    <%@foods.each do |food| %>
    <tr>
        <td> <%= food.name %></td>
        <td> <%= food.price %> JMF</td>
    </tr>
    <% end %>
</table>
<% end %>
```

A fenti példában végigmegyünk, a @foods listán és minden elem nevét és árát beilesztjük egy html táblázatba.

Ahhoz, hogy az index action el tudjuk érni, kell hozzá utat biztosítani. Ha belegondolunk minden új oldalhoz kell út, ezért eléggé sokat kéne írni, ami nem olyan jó. Erre nyújt megoldást a **resourceful routing**.
```ruby
config/routes.rb

resources :foods
```

Ez létrehozza nekünk a leggyakrabban használt (CRUD megvalósításhoz szükséges) utakat, így nem kell mindig ide írogatni.

Az alábbi paranccsal megnézhetjük, hogy milyen utak lettek létrehozva.

```sh
rails routes
```
Észre vehettük, hogy a kezdőoldal még mindig az alap Rails-es üdvözlő oldal. Ezt az alábbi módon, állíthatjuk át a FoodController index action-jére. 

```ruby
config/routes.rb

  root to: 'foods#index'
```
Igy már a localhost:3000-es címen is elérhető az index.

Már meg tudjuk nézni az ételeket, de jó lenne ha fel is tudnánk venni őket. Ehhez új action-ök kellenek a Food Controller-be.  

```ruby
app/controllers/foods_controller.rb

def new
  @food = Food.new
end
```

Létrehozunk egy új, még üres Food objektumot. És leküldjük a new-hoz tartozó viewnak. 

```ERB
app/views/foods/new.html.erb

<h1>New Food</h1>
<%= form_for @food do |f| %>
  <p>
    <%= f.label :name %>:
    <%= f.text_field :name %>
  </p>
  <p>
    <%= f.label :price%>:
    <%= f.text_field :price %>
  </p>
  <p>
    <%= submit_tag 'Create' %>
  </p>
<% end %>
```

A new view-ban, az ERB-t használva létrehozunk egy formot, ami megkapja az új food objectet. A form az új objectbe betölti a felhasználó által beírt paramétereket. Majd beküldi a create action-nek.

```RUBY
app/controllers/foods_controller.rb

def create
  @food = Food.new(food_params)
  if @food.save
   redirect_to foods_path
  else
    render 'new'
  end
end

private

def food_params
  params.require('food').permit('name','price')
end

```
A beküldött paramétereket közül ki kell szedni a megfelelő elemeket. A require megnézi,hogy jelen van-e a paraméterek között a food kulcs, ha igen visszatér vele, ellenkező esetben hamisat ad. A permit pedig visszaadja a paraméterként kapott kulccsal rendelkező elemeket, amennyiben léteznek. Ezt a módszert **strong_params**-nak hívják és gyakran használják. Miután megkaptuk a szükséges paramétereket felvehetjük az új Food-ot az adatbázisba. 

Tegyük fel, hogy szeretnénk minden ételnek egy saját oldalt, ahol megjelenítehetünk,majd részleteket is. Ehhez létrehozunk egy show actiont, ami a paraméterként kapott id alpaján megkeresi az adott elemet.

```ruby
app/controllers/foods_controller.rb

def show
    @food = Food.find(params[:id])
end
```

Majd létrehozunk egy view-et is hozzá.

```html
app/views/foods/show.html.erb

<h1>Food</h1>
<h2>Name: <%= @food.name %></h2>
<h2>Price: <%= @food.price%> JMF</h2>
<p> Majd a harmadik alkalmon ide teszünk képet, extra szövegt és egy listát a hozzávalókról.</p>
```

A fenti view megjeleníti egy ételnek a nevét és árát.

Már szép számú oldalunk van, de eléggé zavaró, hogy az url-be kell írással kell navigálni. Linkek létrehozásával egyerűsíthetnénk a dolgot. Ehhez először nézzük meg újra a rails routes parancs által listázott utakat. Megfigyelhetjük,hogy a legtöbb action-höz tartozik egy prefix. Ezeket felhasználva **route_helper**-eket hozhatunk létre, amik segtségével könnyen és URL függetlenül hivatkozhatunk egyes action-ökre.

```erb
app/views/foods/index.html.erb

(a food.price-os cella alá illeszük be)
<td> <%= link_to 'Show',food_path(food) %> </td>

(az oldal aljára helyezzük el)
<%=link_to "New food",new_food_path %>

app/views/foods/show.html.erb

<%= link_to 'Home',foods_path %>
```
Helyezzük el a fenti linkeket a megadott oldalakon.

Már fel tudunk venni és le is tudunk kérdezni adatokat, az adatbázisból. Amit észrevehetünk, hogy bármilyen adatot fel tud venni a felhasználó. Lehetséges például, árnak nem számot megadni, ami inkonzisztenciát okozhat az adatok között. Az adatok érvényességének ellenőrzésére validációkat hozunk létre.

```ruby
# app/models/food.rb

class Food < ApplicationRecord
  validates :name, length: {minimum:4, maximum: 12}
  validates :price, numericality: true
end
```

A Food modelhez hozzáadtunk két validációt. Az első ellenőrzi,hogy a név minimum 4, maximum 12 karakter hosszú. A második pedig az ár attributúm számosságát validálja. Ha most próbálunk elmenteni nem megfelelő adatot, akkor az már nem fog elmentődni,de semmi visszajelzést nem kapunk arról, hogy mi a hiba.
```erb
app/views/foods/new.html.erb

<% if @food.errors.any? %>
  <div id="error_explanation">
    <h2>
      <%= pluralize(@food.errors.count, "error") %> prohibited
      this food from being saved:
    </h2>
    <ul>
      <% @food.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
    </ul>
  </div>
<% end %>
```

Megfigyelhető, hogy a validációs hibáknak van fenttartva egy errors hash a modellekben. Ebbe kerül minden hibákkal kapcsolatos üzenet.

A követekző lépés a felvett ételek módosítása.

```ruby
app/controllers/foods_controller.rb
  
  def edit
    @food = Food.find(params[:id])
  end

  def update
    @food = Food.find(params[:id])
    if @food.update(food_params)
      redirect_to @food
    else
      render 'edit'
    end
  end

```
Hozzunk létre az edit action-re is linket.

```erb
app/views/foods/index.html.erb

<td> <%= link_to 'Edit',edit_food_path(food) %> </td>
```

Nagyjából ugyanazt csináljuk, mint a create-nél. A view-knál is hasonló a helyzet. A new.html.erb-ben található formot kéne használnunk az edit.html.erb-ben is. Érezhetjük, hogy a simán átmásolás nem feltétlenül a legjobb mód. Van lehetőségünk partial-ökbe kiszervezni a view-ek egyes részeit és újrahasználni őket. A formhoz tartozó erb kódot kivágjuk a new.html.erb-ből és beillesztjük egy partial-be. A partial-ök nevei minidg _-al kezdődnek, ez különbözteti meg őket a sima view-ektől.

```erb
app/views/foods/_form.html.erb

<% if @food.errors.any? %>
  <div id="error_explanation">
    <h2>
      <%= pluralize(@food.errors.count, "error") %> prohibited
      this food from being saved:
    </h2>
    <ul>
      <% @food.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
    </ul>
  </div>
<% end %>

<%= form_for @food do |f| %>
  <p>
    <%= f.label :name %>:
    <%= f.text_field :name %>
  </p>
  <p>
    <%= f.label :price%>:
    <%= f.text_field :price %>
  </p>
  <p>
    <%= submit_tag 'Create' %>
  </p>
<% end %>
```
A new oldal az alábbira módosítjuk.

```erb
app/views/foods/new.html.erb

<h1>New Food</h1>
<%= render 'form' %>
```

Majd az edithez is hozzáadjuk a formot.

```erb
app/views/foods/edit.html.erb

<h1>Edit Food</h1>
<%= render 'form' %>
```

Itt annyi történik, render helyére kerül a _form.html.erb tartalma.

A CRUD-ból már csak Delete maradt.

```ruby
app/controllers/foods_controller.rb

  def destroy
    food = Food.find(params[:id])
    food.destroy
    redirect_to foods_path
  end
```

Megkeressük a paraméterként megadott id alapján a törlendő ételt, majd töröljük az adatbázisból. Ezután visszairányítjuk a felhasználót az index oldalra. 

```erb
app/views/foods/index.html.erb

<td> <%= link_to 'Delete',food_path(food), method: :delete, data:{confirm: 'Are you sure?'} %> </td>
```
Még elhelyezünk egy linket és kész is.

## Részletesebb leírás / minőségi forrás:
https://guides.rubyonrails.org/
