# Bevezető előadás jegyzet

## Általános tanfolyam bevezető

* bemutatkozás, körről is két szó (dia sem árt)
* tanfolyamról
    * felépítés: 3+1 alkalom, gyakorlat orientált
    * tartalom: js hangsúly, de html + css is
    * időpontok
    * elérhetőség, segédanyagok, github repo
    * segédanyagokat emailben kiküldjük majd
* nem cél (mert nem lehetséges):
    * profi webfejlesztő legyél a végére
    * mindent megtanítsunk a js, html, css körül
* cél:
    * felkeltsük az érdeklődésed
    * alapokat adjunk: tudd merre indulj el
    * (kir-dev közelébe mozgassunk :))

## Internet alapok

* mi az internet?
    * sok gép hálózata
    * elosztott
    * "látható" internet (weboldalak) kicsi, sok a gép-gép kommunikáció pl vir bejelentkezés
    * tanfolyamon: főleg a "látható" rész
* kliens-szerver architektúra (diára képet)
* vékony- és vastagkliens
    * különbségek
    * trend és "hagyomány"
* hozzánk legközelebb eső protokoll: HTTP (Hypertext Transfer Protocol)

## HTTP

* rfc 2616 (~180 oldal)
* szöveg alapú
    * stringek utaznak a hálózaton
    * nézzünk megy egy demot (egyszerű http szerver és kliens)
    * kódot is nézzük; lássuk, hogy egyszerű
* kérés-válasz
* kérés és válasz felépítése hasonló: fejléc + törzs
    * fejléc: kulcs-érték párok a szervernek/től
    * törzs: szabadon felhasznált -> pl weboldalak tartalma
* nézzünk meg egy kérés-válasz párt (kir-dev blog alkalmas lesz példálózni)
    * kérés (request):
        * első sor magyarázata
        * néhány header a requestben (host, accept, connection?, user-agent)
        * cookie
    * válasz (response):
        * első sor -> status code
        * néhány header (content-encoding, content-type, cache-control)
* állapotmentes
    * session: egyedi azonosítót küldünk minden kérésben
    * klasszikus példa: bevásárló kosár
* cookie
    * kulcs-érték párok
    * minden kéréssel elmegy

## Chrome, mint fejlesztőeszköz

* dev-toolbar bevezető -> demo ezerrel
* network panel
* dom nézegetés, és manipuláció
* javascript debugger, console
* live edit

## Összegzés

* nincs varázslat
* csak sok gép hálózatba kötve
* egymással beszélgetnek
