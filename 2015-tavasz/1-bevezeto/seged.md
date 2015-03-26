# Bevezető

Az első előadásban a web alapokról és a HTTP-ről volt szó. Itt egy kis
kitekintést szeretnék adni az előbbihez. Az előadáson szándékosan nem mentünk a
dolgok mélyére. Ahhoz, hogy a kliens oldalon elkezdjetek fejleszteni nem kell
ismerni, hogy a byte-ok pontosan hogyan kerülnek a szerverről a böngésződbe.
Viszont, ha nem csak a kliens oldal érdekel, akkor mindenképpen érdemes érteni,
hogy mi történik a háttérben.

## Mi történik amikor beírsz egy webcímet a böngésződbe?

Az alábbi rövid kis képregény elmeséli, hogy a felhőben nagyjából mi történik.

![internet cartoon](http://d24w6bsrhbeh9d.cloudfront.net/photo/aVOL0Zd_700b.jpg)

Egy listába összeszedve:

1. beírod a böngésződbe: http://kir-dev.sch.bme.hu
2. a _kir-dev.sch.bme.hu_-t a DNS ([Domain Name System](http://en.wikipedia.org/wiki/Domain_Name_System))
szerver oldja fel egy [IP](http://en.wikipedia.org/wiki/Internet_Protocol) címre.
Az IP cím (ezzel azonosítható egy gép az interneten) kiderítése után lehet csak a kérést valójában elküldeni.
3. a kérés tartalmát ([HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) fejléc+törzs)
[TCP](http://en.wikipedia.org/wiki/Transmission_Control_Protocol)-n
keresztül jut el a szerverhez.
4. a szerveren feldolgozásra kerül a kérés: lehet, hogy csak fájlt küld vissza,
de az is lehet, hogy a válasz tartalmát dinamikusan állítja elő.
5. kérésben a feladó (IP) címe is benne van, így a szerver tudja, hogy kinek kell visszaküldeni

Ahogy a fenti rajzon is látható a kérésnek esetleg egyéb "akadályokkal" is meg
kell küzdenie, míg eljut a céljához. Ki kell jutnia a helyi hálózatról az
internetre. Itt lehetnek tűzfalak, proxy-k, routerek és még sok más. Sőt az sem
biztos, hogy DNS szervertől kapott IP címen rögtön a kívánt szerver figyel. A
szerver oldali infrastruktúra is lehet bonyolult proxy-kkal,
terheléselosztókkal, stb. Sőt az sem biztos, hogy a válasz előállításában egyetlen
szerver vesz csak részt.

Ezeket csak megemlítjük, de a tanfolyam kereteibe nem fér bele, hogy
részletesebben is meséljünk róluk.

## Vékony és vastagkliens a weben

Vékony kliensre számtalan példa található net szerte. Például a
[PÉK](https://korok.sch.bme.hu) is az. A PÉKben szinte minden a szerver oldalon
történik, a kliens oldalon majdnem teljesen statikus oldalakat láthatunk.

Klasszikus vastag kliens nem található a weben, inkább hibrid alkalmazások
vannak. Azért nem nevezhetőek a vastag kliensnek a webes alkalmazások, mert
offline nem használhatóak. Ezek általában bonyolultabb és inkább asztali
alkalmazásra hasonlító felhasználói felülettel rendelkeznek. Ilyenek például a
Gmail, a SoundCloud és a [Discourse](http://www.discourse.org/) is.

## Demók

Az előadáson bemutatott HTTP szervert és klienst ti is tudjátok futtatni. A
programok fordításához a [go nyelv](http://golang.org/) szükséges.

Ha sikerült telepíteni a go-t a gépetekre, akkor a következő paranccsal tudjátok
elindítani a szervert:

    $ go run http-server.go

A `http-client` is hasonlóan indítható:

    # GET kérés a localhostra
    $ go run http-client.go
    # GET kérés a kir-dev blogra
    $ go run http-client.go kir-dev.sch.bme.hu:80
