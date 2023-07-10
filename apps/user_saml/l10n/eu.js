OC.L10N.register(
    "user_saml",
    {
    "This user account is disabled, please contact your administrator." : "Erabiltzaile-kontu hau desgaitua dago, jarri harremanetan administratzailearekin",
    "Saved" : "Gordeta",
    "Could not save" : "Ezin izan da gorde",
    "Provider" : "Hornitzailea",
    "Unknown error, please check the log file for more details." : "Errore ezezaguna, egiaztatu egunkari-fitxategia xehetasun gehiagorako.",
    "Direct log in" : "Saio-hasiera zuzena",
    "SSO & SAML log in" : "SSO eta SAML saio-hasiera",
    "This page should not be visited directly." : "Orri hau ezin da zuzenean ikusi.",
    "Provider " : "Hornitzailea",
    "X.509 certificate of the Service Provider" : "Zerbitzu-hornitzailearen X.509 ziurtagiria",
    "Private key of the Service Provider" : "Zerbitzu-hornitzaileraren gako pribatua",
    "Indicates that the nameID of the <samlp:logoutRequest> sent by this SP will be encrypted." : "SP honek bidalitako <samlp:logoutRequest> nameIDa enkriptatuta egongo dela adierazten du.",
    "Indicates whether the <samlp:AuthnRequest> messages sent by this SP will be signed. [Metadata of the SP will offer this info]" : "SP honek bidalitako <samlp:AuthnRequest> mezuak sinatuko diren ala ez adierazten du. [SPren metadatuek informazio hau eskainiko dute]",
    "Indicates whether the  <samlp:logoutRequest> messages sent by this SP will be signed." : "SP honek bidalitako  <samlp:logoutResponse> mezuak sinatu behar diren ala ez adierazten du.",
    "Indicates whether the  <samlp:logoutResponse> messages sent by this SP will be signed." : "SP honek bidalitako <samlp:logoutResponse> mezuak sinatu behar diren ala ez adierazten du.",
    "Whether the metadata should be signed." : "Metadatuek sinatuta egon behar duten ala ez.",
    "Indicates a requirement for the <samlp:Response>, <samlp:LogoutRequest> and <samlp:LogoutResponse> elements received by this SP to be signed." : "SP honek jasotako <samlp:Response>,<samlp:LogoutRequest>eta<samlp:LogoutResponse> elementuak sinatzeko baldintzak adierazten ditu.",
    "Indicates a requirement for the <saml:Assertion> elements received by this SP to be signed. [Metadata of the SP will offer this info]" : "SP honek jasotako <saml:Assertion>elementuak sinatzeko baldintzak adierazten ditu. [SPren metadatuek informazio hau eskainiko dute]",
    "Indicates a requirement for the <saml:Assertion> elements received by this SP to be encrypted." : "SP honek jasotako <saml:Assertion> elementuak enkriptatzeko baldintza adierazten du.",
    " Indicates a requirement for the NameID element on the SAMLResponse received by this SP to be present." : "SP honek jasotako SAMLResponse-n NameID elementuak behar duen baldintza adierazten du.",
    "Indicates a requirement for the NameID received by this SP to be encrypted." : "SP honek jasotako NameID enkriptatzeko baldintza adierazten du.",
    "Indicates if the SP will validate all received XML." : "SPk jasotako XML guztia balioztatuko duen adierazten du.",
    "ADFS URL-Encodes SAML data as lowercase, and the toolkit by default uses uppercase. Enable for ADFS compatibility on signature verification." : "ADFS URL-k SAML datuak minuskulaz kodetzen ditu eta tresna-multzoak modu lehenetsian maiuskula erabiltzen du. Gaitu ADFS bateragarritasuna sinadura egiaztatzerakoan.",
    "Algorithm that the toolkit will use on signing process." : "Tresnak sinadura-prozesuan erabiliko duen algoritmoa.",
    "Retrieve query parameters from $_SERVER. Some SAML servers require this on SLO requests." : "Berreskuratu kontsulta-parametroak $ _SERVER-etik. SAML zerbitzari batzuek hori eskatzen dute SLO eskaeretan.",
    "Attribute to map the UID to." : "UIDa esleitzeko atributua.",
    "Only allow authentication if an account exists on some other backend (e.g. LDAP)." : "Baimendu autentifikazioa beste atzeko sistema batean kontu bat baldin badago bakarrik (adibidez, LDAP).",
    "Attribute to map the displayname to." : "Atributua bistaratze-izena esleitzeko.",
    "Attribute to map the email address to." : "Atributua helbide elektronikoa esleitzeko.",
    "Attribute to map the quota to." : "Kuota esleitzeko atributua.",
    "Attribute to map the users groups to." : "Atributua erabiltzaileen taldeak esleitzeko.",
    "Attribute to map the users home to." : "Atributua erabiltzaileak etxera esleitzeko.",
    "Group A, Group B, …" : "A taldea, B taldea, ...",
    "Email address" : "Helbide elektronikoa",
    "Encrypted" : "Zifratua",
    "Entity" : "Entitatea",
    "Kerberos" : "Kerberos",
    "Persistent" : "Iraunkorra",
    "Transient" : "Behin-behinekoa",
    "Unspecified" : "Zehaztu gabea",
    "Windows domain qualified name" : "Windows domeinu-izen kualifikatua",
    "X509 subject name" : "X509 gaia",
    "Use SAML auth for the %s desktop clients (requires user re-authentication)" : "Erabili SAML autentifikazioa mahaigaineko %s bezeroentzat (erabiltzaileak berriro autentifikatzea eskatzen du)",
    "Optional display name of the identity provider (default: \"SSO & SAML log in\")" : "Identitate-hornitzailearen aukerako bistaratze-izena (lehenetsia: \"SSO eta SAML saioa hasi\")",
    "Allow the use of multiple user back-ends (e.g. LDAP)" : "Baimendu erabiltzaile-atzealde anitzen erabilpena (adib. LDAP)",
    "SSO & SAML authentication" : "SSO eta SAML autentifikazioa",
    "Authenticate using single sign-on" : "Autentifikatu saio-hasiera bakarra erabiliz",
    "Using the SSO & SAML app of your Nextcloud you can make it easily possible to integrate your existing Single-Sign-On solution with Nextcloud. In addition, you can use the Nextcloud LDAP user provider to keep the convenience for users. (e.g. when sharing)\nThe following providers are supported and tested at the moment:\n\n* **SAML 2.0**\n\t* OneLogin\n\t* Shibboleth\n\t* Active Directory Federation Services (ADFS)\n\n* **Authentication via Environment Variable**\n\t* Kerberos (mod_auth_kerb)\n\t* Any other provider that authenticates using the environment variable\n\nWhile theoretically any other authentication provider implementing either one of those standards is compatible, we like to note that they are not part of any internal test matrix." : "Zure Nextcloud-eko SSO & SAML aplikazioa erabiliz, lehendik duzun Saio-hasiera bakarreko irtenbidea Nextcloud-ekin integratzea erraztu dezakezu. Gainera, Nextcloud LDAP erabiltzaile hornitzailea erabili dezakezu erabiltzaileentzako erosotasuna mantentzeko. (adibidez, partekatzean)\nUne honetan honako hornitzaile hauek onartzen eta probatzen dira:\n\n* **SAML 2.0**\n\t* OneLogin\n\t* Shibboleth\n\t* Active Directory Federation Services (ADFS)\n\n* **Inguruneko aldagaiaren bidez autentifikatzea**\n\t* Kerberos (mod_auth_kerb)\n\t* Inguruneko aldagaia erabiliz autentifikatzen duen beste edozein hornitzaile\n\nTeorikoki estandar horietako bat inplementatzen duen beste edozein autentifikazio hornitzaile bateragarria den arren, ohartarazi nahi dugu ez direla barneko test matrize baten parte.",
    "Open documentation" : "Ireki dokumentazioa",
    "Make sure to configure an administrative user that can access the instance via SSO. Logging-in with your regular %s account will not be possible anymore, unless you enabled \"%s\" or you go directly to the URL %s." : "Ziurtatu SSO bidez instantziara sar daitekeen administrari erabiltzaile bat konfiguratzen duzula. Ohiko %s kontuarekin saioa hastea ezinezkoa izango da, zuk \"%s\" gaitu edo zuzenean %sURLera joaten ez bazara.",
    "Make sure to configure an administrative user that can access the instance via SSO. Logging-in with your regular %s account will not be possible anymore, unless you go directly to the URL %s." : "Ziurtatu SSO bidez instantziara sar daitekeen administrari-erabiltzaile bat konfiguratzen duzula. Zure ohiko %s kontuarekin saioa hastea ezinezkoa izango da, zuzenean %sURLera joan ezean.",
    "Please choose whether you want to authenticate using the SAML provider built-in in Nextcloud or whether you want to authenticate against an environment variable." : "Aukeratu ea Nextcloud-en integratutako SAML hornitzailea erabiliz autentifikatu nahi duzun edo inguruneko aldagai batekin autentifikatu nahi duzun.",
    "Use built-in SAML authentication" : "Erabili integratutako SAML autentifikazioa",
    "Use environment variable" : "Erabili inguruneko aldagaia",
    "Global settings" : "Ezarpen orokorrak",
    "Remove identity provider" : "Kendu identitate-hornitzailea",
    "Add identity provider" : "Gehitu identitate-hornitzailea",
    "General" : "Orokorra",
    "Service Provider Data" : "Zerbitzu-hornitzailearen datuak",
    "If your Service Provider should use certificates you can optionally specify them here." : "Zerbitzu-hornitzaileak ziurtagiriak erabili behar baditu hemen zehaztu ditzakezu.",
    "Show Service Provider settings…" : "Erakutsi zerbitzu-hornitzailearen ezarpenak...",
    "Name ID format" : "Izena ID formatua",
    "Identity Provider Data" : "Identitate-hornitzailearen datuak",
    "Configure your IdP settings here." : "Konfiguratu zure IdParen ezarpenak hemen.",
    "Identifier of the IdP entity (must be a URI)" : "IdP-entitatearen identifikatzailea (URI bat izan behar du)",
    "URL Target of the IdP where the SP will send the Authentication Request Message" : "IdParen URLaren helburua, SPk autentifikazio eskaera mezua bidaliko duenean",
    "Show optional Identity Provider settings…" : "Erakutsi identitate-hornitzailearen aukerako ezarpenak...",
    "URL Location of the IdP where the SP will send the SLO Request" : "IDPren URL kokalekua, SPk SLO eskaera bidaliko duen tokira",
    "URL Location of the IDP's SLO Response" : "IDPren SLO erantzunaren URL kokalekua",
    "Public X.509 certificate of the IdP" : "IdParen X.509 ziurtagiri publikoa",
    "Attribute mapping" : "Atributu-esleitzea",
    "If you want to optionally map attributes to the user you can configure these here." : "Erabiltzaileari aukerako atributuak esleitu nahi badizkiozu, hemen konfiguratu ditzakezu.",
    "Show attribute mapping settings…" : "Erakutsi atributuen esleitze ezarpenak...",
    "Security settings" : "Segurtasun-ezarpenak",
    "For increased security we recommend enabling the following settings if supported by your environment." : "Zure inguruneak onartzen baditu ezarpen hauek gaitzea gomendatzen da segurtasuna hobetzeko.",
    "Show security settings…" : "Erakutsi segurtasun-ezarpenak",
    "Signatures and encryption offered" : "Sinadurak eta zifratzea eskaintzen dira",
    "Signatures and encryption required" : "Sinadurak eta zifratzea derrigorrezkoak dira",
    "User filtering" : "Erabiltzaileen iragazketa",
    "Download metadata XML" : "Deskargatu metadatuen XMLa",
    "Reset settings" : "Berrezarri ezarpenak",
    "Metadata invalid" : "Baliogabeko metadatuak",
    "Metadata valid" : "Baliozko metadatuak",
    "Error" : "Errorea",
    "Access denied." : "Sarbidea ukatua.",
    "Account not provisioned." : "Ez da kontua eman.",
    "Your account is not provisioned, access to this service is thus not possible." : "Zure kontua ez dago hornituta. Zerbitzu honetara sarbidea, ondorioz, ez da posiblea.",
    "Login options:" : "Saio-hasiera aukerak:",
    "Choose a authentication provider" : "Aukeratu autentifikazio-hornitzailea"
},
"nplurals=2; plural=(n != 1);");
