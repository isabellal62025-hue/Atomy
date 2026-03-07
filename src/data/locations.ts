// Datos de países con códigos telefónicos, departamentos y municipios

export interface Departamento {
  nombre: string;
  municipios: string[];
}

export interface Pais {
  nombre: string;
  codigo: string;
  bandera: string;
  departamentos: Departamento[];
}

export const paises: Pais[] = [
  {
    nombre: "Guatemala",
    codigo: "+502",
    bandera: "🇬🇹",
    departamentos: [
      { nombre: "Guatemala", municipios: ["Guatemala", "Mixco", "Villa Nueva", "Chinautla", "San Miguel Petapa", "Villa Canales", "Amatitlán", "San José Pinula", "San Juan Sacatepéquez", "San Raymundo", "Chuarrancho", "Fraijanes", "Palencia"] },
      { nombre: "Alta Verapaz", municipios: ["Cobán", "Chahal", "Chisec", "Cahabón", "Lanquín", "Panzós", "Raxruhá", "San Cristóbal Verapaz", "Santa Cruz Verapaz", "Senahú", "Tucurú", "Tamanco"] },
      { nombre: "Baja Verapaz", municipios: ["Salamá", "San Jerónimo", "San Miguel Chicaj", "Rabinal", "Cubulco", "Granados", "El Chol"] },
      { nombre: "Chimaltenango", municipios: ["Chimaltenango", "San José Poaquil", "San Martín Jilotepeque", "San Juan Comalapa", "Santa Apolonia", "Tecpán Guatemala", "Patzún", "Patzicía", "Santa Cruz Balanyá", "Acatenango", "San Andrés Itzapa", "Parramos", "Zaragoza"] },
      { nombre: "Chiquimula", municipios: ["Chiquimula", "San José La Arada", "San Juan Ermita", "Jocotán", "Camotán", "Olopa", "Esquipulas", "Concepción Las Minas", "Quezaltepeque", "San Jacinto", "Ipala"] },
      { nombre: "El Progreso", municipios: ["Guastatoya", "Morazán", "San Agustín Acasaguastlán", "San Cristóbal Acasaguastlán", "El Jícaro", "Sansare", "Sanarate", "San Antonio La Paz"] },
      { nombre: "Escuintla", municipios: ["Escuintla", "Santa Lucía Cotzumalguapa", "La Democracia", "Siquinalá", "Masagua", "Tiquisate", "La Gomera", "Guanagazapa", "San José", "Iztapa", "Palín", "San Vicente Pacaya", "Nueva Concepción", "Sipacate"] },
      { nombre: "Huehuetenango", municipios: ["Huehuetenango", "Chiantla", "Malacatancito", "Cuilco", "Nentón", "San Antonio Huista", "Jacaltenango", "San Pedro Necta", "San Rafael La Independencia", "Santa Eulalia", "Soloma", "Barillas", "San Mateo Ixtatán", "San Sebastián Coatán", "Aguacatán", "San Rafael Pétzal", "La Libertad", "La Democracia", "San Gaspar Ixchil", "Santiago Chimaltenango", "Todos Santos Cuchumatán", "Concepción Huista", "San Juan Atitán", "San Sebastián Huehuetenango", "Tectitán"] },
      { nombre: "Izabal", municipios: ["Puerto Barrios", "Livingston", "El Estor", "Morales", "Los Amates"] },
      { nombre: "Jalapa", municipios: ["Jalapa", "Mataquescuintla", "Monjas", "San Luis Jilotepeque", "San Pedro Pinula", "San Carlos Alzatate", "San Manuel Chaparrón"] },
      { nombre: "Jutiapa", municipios: ["Jutiapa", "El Progreso", "Santa Catarina Mita", "Agua Blanca", "Asunción Mita", "Yupiltepeque", "Atescatempa", "Jerez", "El Adelanto", "Zapotitlán", "Comapa", "Jalpatagua", "Conguaco", "Moyuta", "Pasaco", "San José Acatempa", "Quesada"] },
      { nombre: "Petén", municipios: ["Flores", "San José", "San Benito", "San Andrés", "La Libertad", "San Francisco", "Santa Ana", "Dolores", "Sayaxché", "Poptún", "Melchor de Mencos", "El Chal"] },
      { nombre: "Quetzaltenango", municipios: ["Quetzaltenango", "Salcajá", "Olintepeque", "San Carlos Sija", "Sibilia", "Cabricán", "Cajolá", "San Miguel Siguilá", "Ostuncalco", "San Mateo", "Concepción Chiquirichapa", "San Martín Sacatepéquez", "Almolonga", "Cantel", "Huitán", "Zunil", "Colomba", "San Francisco La Unión", "El Palmar", "Coatepeque", "Génova", "Flores Costa Cuca", "La Esperanza", "Palestina de Los Altos"] },
      { nombre: "Quiché", municipios: ["Santa Cruz del Quiché", "Chiché", "Chinique", "Zacualpa", "Chajul", "San Juan Cotzal", "Nebaj", "Cunén", "San Pedro Jocopilas", "Uspantán", "Sacapulas", "San Andrés Sajcabajá", "San Antonio Ilotenango", "San Bartolomé Jocotenango", "Canillá", "Chicamán", "Ixcán", "Pachalum", "Playa Grande Ixcán"] },
      { nombre: "Retalhuleu", municipios: ["Retalhuleu", "San Sebastián", "Santa Cruz Muluá", "San Martín Zapotitlán", "San Felipe", "San Andrés Villa Seca", "Champerico", "Nuevo San Carlos", "El Asintal"] },
      { nombre: "Sacatepéquez", municipios: ["Antigua Guatemala", "Jocotenango", "Pastores", "Sumpango", "Santiago Sacatepéquez", "San Bartolomé Milpas Altas", "San Lucas Sacatepéquez", "Santa Lucía Milpas Altas", "Magdalena Milpas Altas", "Santa María de Jesús", "Ciudad Vieja", "San Miguel Dueñas", "Alotenango", "San Antonio Aguas Calientes", "Santa Catarina Barahona"] },
      { nombre: "San Marcos", municipios: ["San Marcos", "San Pedro Sacatepéquez", "San Antonio Sacatepéquez", "Comitancillo", "San Miguel Ixtahuacán", "Concepción Tutuapa", "Tacaná", "Sibinal", "Tajumulco", "Tejutla", "San Rafael Pié de La Cuesta", "Nuevo Progreso", "El Tumbador", "El Rodeo", "Malacatán", "Catarina", "Ayutla", "Ocós", "San Pablo", "El Quetzal", "La Reforma", "Pajapita", "Ixchiguán", "San José Ojetenam"] },
      { nombre: "Santa Rosa", municipios: ["Cuilapa", "Barberena", "Santa Rosa de Lima", "Pueblo Nuevo Viñas", "Guazacapán", "San Juan Tecuaco", "Chiquimulilla", "Taxisco", "Santa María Ixhuatán", "Nueva Santa Rosa", "Casillas", "San Rafael Las Flores", "Oratorio", "San Rafael", "Monjas"] },
      { nombre: "Sololá", municipios: ["Sololá", "San José Chacayá", "Santa María Visitación", "Santa Lucía Utatlán", "Nahualá", "Santa Catarina Ixtahuacán", "Santa Clara La Laguna", "Concepción", "San Andrés Semetabaj", "Panajachel", "Santa Cruz La Laguna", "San Pablo La Laguna", "San Marcos La Laguna", "San Juan La Laguna", "San Pedro La Laguna", "Santiago Atitlán", "San Lucas Tolimán"] },
      { nombre: "Suchitepéquez", municipios: ["Mazatenango", "Cuyotenango", "San Francisco Zapotitlán", "San Bernardino", "San José El Ídolo", "Santo Domingo Suchitepéquez", "San Lorenzo", "Samayac", "San Pablo Jocopilas", "San Antonio Suchitepéquez", "San Miguel Panán", "San Gabriel", "Chicacao", "Patulul", "Santa Bárbara", "San Juan Bautista", "Santo Tomás La Unión", "Zunilito", "Pueblo Nuevo", "Río Bravo"] },
      { nombre: "Totonicapán", municipios: ["Totonicapán", "San Cristóbal Totonicapán", "San Francisco El Alto", "San Andrés Xecul", "Momostenango", "Santa María Chiquimula", "Santa Lucía La Reforma", "San Bartolo"] },
      { nombre: "Zacapa", municipios: ["Zacapa", "Estanzuela", "Río Hondo", "Gualán", "Teculután", "Usumatlán", "La Unión", "Cabañas", "San Diego", "San Jorge", "Huité"] }
    ]
  },
  {
    nombre: "El Salvador",
    codigo: "+503",
    bandera: "🇸🇻",
    departamentos: [
      { nombre: "San Salvador", municipios: ["San Salvador", "Apopa", "Ayutuxtepeque", "Cuscatancingo", "Delgado", "Ilopango", "Mejicanos", "San Martín", "Soyapango", "Tonacatepeque"] },
      { nombre: "Santa Ana", municipios: ["Santa Ana", "Chalchuapa", "Coatepeque", "El Congo", "Metapán", "Texistepeque"] },
      { nombre: "San Miguel", municipios: ["San Miguel", "Chirilagua", "Chinameca", "Moncagua", "Nueva Guadalupe", "Quelepa", "San Antonio", "San Gerardo", "San Jorge", "San Luis de la Reina", "Sesori", "Uluazapa"] },
      { nombre: "La Libertad", municipios: ["Santa Tecla", "Antiguo Cuscatlán", "Chiltiupán", "Ciudad Arce", "Colón", "Comasagua", "Huizúcar", "Jayaque", "Jicalapa", "La Libertad", "Nuevo Cuscatlán", "San Juan Opico", "Quezaltepeque", "Sacacoyo", "San José Villanueva", "San Matías", "San Pablo Tacachico", "Talnique", "Tamanique", "Teotepeque", "Tepecoyo", "Zaragoza"] },
      { nombre: "Usulután", municipios: ["Usulután", "Alegría", "Berlín", "California", "Concepción Batres", "El Triunfo", "Ereguayquín", "Estanzuelas", "Jiquilisco", "Jucuapa", "Jucuarán", "Mercedes Umanía", "Nueva Granada", "Ozatlán", "Puerto El Triunfo", "San Agustín", "San Buenaventura", "San Dionisio", "Santa Elena", "Santa María", "Santiago de María", "Tecapán"] },
      { nombre: "Sonsonate", municipios: ["Sonsonate", "Acajutla", "Armenia", "Caluco", "Cuisnahuat", "Izalco", "Juayúa", "Nahuizalco", "Nahulingo", "Salcoatitán", "San Antonio del Monte", "San Julián", "Santa Catarina Masahuat", "Santa Isabel Ishuatán", "Santo Domingo", "Sonzacate"] },
      { nombre: "Ahuachapán", municipios: ["Ahuachapán", "Apaneca", "Atiquizaya", "Concepción de Ataco", "El Refugio", "Guaymango", "Jujutla", "San Francisco Menéndez", "San Lorenzo", "San Pedro Puxtla", "Tacuba", "Turín"] },
      { nombre: "La Unión", municipios: ["La Unión", "Anamorós", "Bolívar", "Conchagua", "El Carmen", "El Sauce", "Intipucá", "Lislique", "Meanguera del Golfo", "Morazán", "Nueva Esparta", "Pasaquina", "Polorós", "San Alejo", "San José", "Santa Rosa de Lima", "Yayantique", "Yucuaiquín"] },
      { nombre: "Morazán", municipios: ["San Francisco Gotera", "Arambala", "Cacaopera", "Chilanga", "Corinto", "Delicias de Concepción", "El Divisadero", "El Rosario", "Gualococti", "Guatajiagua", "Joateca", "Jocoaitique", "Jocoro", "Lolotiquillo", "Meanguera", "Morazán", "Osicala", "Perquín", "San Carlos", "San Fernando", "San Isidro", "San Simón", "Sensembra", "Sociedad", "Torola", "Yamabal", "Yoloaiquín"] },
      { nombre: "Cabañas", municipios: ["Sensuntepeque", "Cinquera", "Dolores", "Guacotecti", "Ilobasco", "Jutiapa", "San Isidro", "Tejutepeque", "Victoria"] },
      { nombre: "La Paz", municipios: ["Zacatecoluca", "Cuyultitán", "El Rosario", "Jerusalén", "Mercedes La Ceiba", "Olocuilta", "Paraíso de Osorio", "San Antonio Masahuat", "San Emigdio", "San Francisco Chinameca", "San Juan Nonualco", "San Juan Talpa", "Juan Tepezontes", "San Luis La Herradura", "San Luis Talpa", "San Miguel Tepezontes", "San Pedro Masahuat", "San Pedro Nonualco", "San Rafael Obrajuelo", "Santa María Ostuma", "Santiago Nonualco", "Tapalhuaca"] },
      { nombre: "Cuscatlán", municipios: ["Cojutepeque", "Candelaria", "El Carmen", "El Rosario", "Monte San Juan", "Oratorio de Concepción", "San Bartolomé Perulapía", "San Cristóbal", "San José Guayabal", "San Pedro Perulapán", "San Rafael Cedros", "San Ramón", "Santa Cruz Analquito", "Santa Cruz Michapa", "Suchitoto", "Tenancingo"] },
      { nombre: "Chalatenango", municipios: ["Chalatenango", "Agua Caliente", "Arcatao", "Azacualpa", "Cancasque", "Citalá", "Comalapa", "Concepción Quezaltepeque", "Dulce Nombre de María", "El Carrizal", "El Paraíso", "La Palma", "La Reina", "Las Vueltas", "Nombre de Jesús", "Nueva Concepción", "Nueva Trinidad", "Ojos de Agua", "Potonico", "San Antonio de la Cruz", "San Antonio Los Ranchos", "San Fernando", "San Francisco Lempa", "San Francisco Morazán", "San Ignacio", "San Isidro Labrador", "San José Cancasque", "San José Las Flores", "San Luis del Carmen", "San Miguel de Mercedes", "San Rafael", "Santa Rita", "Tejutla"] },
      { nombre: "San Vicente", municipios: ["San Vicente", "Apastepeque", "Guadalupe", "San Cayetano Istepeque", "San Esteban Catarina", "San Ildefonso", "San Lorenzo", "San Sebastián", "Santa Clara", "Santo Domingo", "Tecoluca", "Tepetitán", "Verapaz"] }
    ]
  },
  {
    nombre: "Honduras",
    codigo: "+504",
    bandera: "🇭🇳",
    departamentos: [
      { nombre: "Francisco Morazán", municipios: ["Tegucigalpa", "Comayagüela", "Santa Lucía", "Ojojona", "San Antonio de Oriente", "San Buenaventura", "Valle de Ángeles", "Villa de San Francisco"] },
      { nombre: "Cortés", municipios: ["San Pedro Sula", "La Lima", "Choloma", "Villanueva", "Puerto Cortés", "Omoa", "Tela", "La Ceiba"] },
      { nombre: "Atlántida", municipios: ["La Ceiba", "Tela", "El Porvenir", "Atlántida", "Jutiapa", "La Masica", "San Francisco", "Arizona"] },
      { nombre: "Yoro", municipios: ["Yoro", "El Progreso", "Tocoa", "Olanchito", "Santa Rita", "Yorito", "Sulaco", "Victoria"] },
      { nombre: "Comayagua", municipios: ["Comayagua", "Siguatepeque", "La Trinidad", "Meámbar", "Minas de Oro", "San Jerónimo", "San José de Comayagua", "San Sebastián"] },
      { nombre: "Copán", municipios: ["Santa Rosa de Copán", "Copán Ruinas", "La Entrada", "San Juan de Opoa", "Cabañas", "Santa Rita", "Dulce Nombre", "El Paraíso"] },
      { nombre: "Santa Bárbara", municipios: ["Santa Bárbara", "San Pedro Sula", "La Entrada", "Trinidad", "Santa Rita", "Quimistán", "Pimienta", "Ilama"] },
      { nombre: "Ocotepeque", municipios: ["Ocotepeque", "San Marcos", "Santa Fe", "Concepción", "Dolores Merendón", "Fraternidad", "La Encarnación", "Sinuapa"] },
      { nombre: "Lempira", municipios: ["Gracias", "La Esperanza", "Santa Rosa de Copán", "Erandique", "San Manuel de Colohete", "Mapulaca", "Guarita", "Virginia"] },
      { nombre: "Intibucá", municipios: ["La Esperanza", "Intibucá", "Jesús de Otoro", "San Juan", "San Miguel Guancapla", "Masaguara", "Santa Lucía", "Yamaranguila"] },
      { nombre: "La Paz", municipios: ["La Paz", "Marcala", "Guajiquiro", "Santa Elena", "San Juan", "San Pedro de Tutule", "Marcala", "Santiago de Puringla"] },
      { nombre: "Valle", municipios: ["Nacaome", "San Lorenzo", "Amapala", "Goascorán", "Alianza", "Caridad", "Langue", "San Francisco de Coray"] },
      { nombre: "Choluteca", municipios: ["Choluteca", "San Lorenzo", "El Triunfo", "Marcovia", "Monjarás", "Namasigue", "Santa Ana de Yusguare"] },
      { nombre: "El Paraíso", municipios: ["Yuscarán", "Danlí", "El Paraíso", "Oropolí", "San Matías", "Texiguat", "Trojes", "Alauca", "Morolica"] },
      { nombre: "Olancho", municipios: ["Juticalpa", "Catacamas", "Santa María del Real", "San Esteban", "Gualaco", "Guata", "Guayape", "Jano", "La Unión", "Mangulile", "Manto", "Salamá", "San Francisco de la Paz", "San Francisco de Becerra", "Silca", "Yocón"] },
      { nombre: "Gracias a Dios", municipios: ["Puerto Lempira", "Brus Laguna", "Ahuas", "Juan Francisco Bulnes", "Ramón Villeda Morales", "Wampusirpe"] },
      { nombre: "Colón", municipios: ["Trujillo", "Tocoa", "Balfate", "Bonito Oriental", "Iriona", "Limón", "Sabá", "Santa Fe", "Sonaguera", "Tela"] },
      { nombre: "Islas de la Bahía", municipios: ["Roatán", "Utila", "Guanaja", "José Santos Guardiola"] }
    ]
  },
  {
    nombre: "México",
    codigo: "+52",
    bandera: "🇲🇽",
    departamentos: [
      { nombre: "Ciudad de México", municipios: ["Álvaro Obregón", "Azcapotzalco", "Benito Juárez", "Coyoacán", "Cuajimalpa", "Cuauhtémoc", "Gustavo A. Madero", "Iztacalco", "Iztapalapa", "La Magdalena Contreras", "Miguel Hidalgo", "Milpa Alta", "Tláhuac", "Tlalpan", "Venustiano Carranza", "Xochimilco"] },
      { nombre: "Jalisco", municipios: ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Tlajomulco de Zúñiga", "Puerto Vallarta", "Lagos de Moreno", "Ciudad Guzmán", "Ocotlán"] },
      { nombre: "Estado de México", municipios: ["Ecatepec", "Nezahualcóyotl", "Naucalpan", "Tlalnepantla", "Toluca", "Chimalhuacán", "Cuautitlán Izcalli", "Valle de Chalco", "Ixtapaluca"] },
      { nombre: "Nuevo León", municipios: ["Monterrey", "Guadalupe", "San Nicolás de los Garza", "Apodaca", "San Pedro Garza García", "Santa Catarina", "Escobedo", "García"] },
      { nombre: "Veracruz", municipios: ["Veracruz", "Xalapa", "Coatzacoalcos", "Poza Rica", "Boca del Río", "Minatitlán", "Córdoba", "Orizaba"] },
      { nombre: "Puebla", municipios: ["Puebla", "Tehuacán", "San Martín Texmelucan", "Atlixco", "Cholula"] },
      { nombre: "Guanajuato", municipios: ["León", "Irapuato", "Celaya", "Salamanca", "Guanajuato", "Silao", "San Miguel de Allende"] },
      { nombre: "Chihuahua", municipios: ["Chihuahua", "Ciudad Juárez", "Delicias", "Parral", "Cuauhtémoc"] },
      { nombre: "Tamaulipas", municipios: ["Reynosa", "Matamoros", "Nuevo Laredo", "Tampico", "Ciudad Victoria", "Victoria"] },
      { nombre: "Baja California", municipios: ["Tijuana", "Mexicali", "Ensenada", "Rosarito", "Tecate"] },
      { nombre: "Sonora", municipios: ["Hermosillo", "Ciudad Obregón", "Nogales", "San Luis Río Colorado", "Guaymas"] },
      { nombre: "Quintana Roo", municipios: ["Cancún", "Playa del Carmen", "Chetumal", "San Miguel de Cozumel"] },
      { nombre: "Yucatán", municipios: ["Mérida", "Valladolid", "Tizimín", "Kanasín", "Uman"] },
      { nombre: "Chiapas", municipios: ["Tuxtla Gutiérrez", "San Cristóbal de las Casas", "Tapachula", "Comitán", "Villaflores"] },
      { nombre: "Otro", municipios: ["Otro estado"] }
    ]
  },
  {
    nombre: "Estados Unidos",
    codigo: "+1",
    bandera: "🇺🇸",
    departamentos: [
      { nombre: "California", municipios: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento", "Long Beach", "Oakland", "Bakersfield", "Anaheim"] },
      { nombre: "Texas", municipios: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Plano", "Laredo"] },
      { nombre: "Florida", municipios: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Tallahassee", "Fort Lauderdale", "Port St. Lucie", "Cape Coral"] },
      { nombre: "New York", municipios: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"] },
      { nombre: "Illinois", municipios: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Springfield"] },
      { nombre: "Pennsylvania", municipios: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton"] },
      { nombre: "Ohio", municipios: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"] },
      { nombre: "Georgia", municipios: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"] },
      { nombre: "North Carolina", municipios: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"] },
      { nombre: "Michigan", municipios: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"] },
      { nombre: "Otro", municipios: ["Otro estado"] }
    ]
  },
  {
    nombre: "Colombia",
    codigo: "+57",
    bandera: "🇨🇴",
    departamentos: [
      { nombre: "Bogotá D.C.", municipios: ["Bogotá"] },
      { nombre: "Antioquia", municipios: ["Medellín", "Bello", "Itagüí", "Envigado", "Rionegro", "Turbo"] },
      { nombre: "Valle del Cauca", municipios: ["Cali", "Buenaventura", "Palmira", "Tuluá", "Buga"] },
      { nombre: "Atlántico", municipios: ["Barranquilla", "Soledad", "Malambo", "Sabanalarga"] },
      { nombre: "Santander", municipios: ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta"] },
      { nombre: "Cundinamarca", municipios: ["Soacha", "Facatativá", "Zipaquirá", "Chía", "Fusagasugá"] },
      { nombre: "Bolívar", municipios: ["Cartagena", "Magangué", "Turbaco", "El Carmen de Bolívar"] },
      { nombre: "Nariño", municipios: ["Pasto", "Tumaco", "Ipiales", "Túquerres"] },
      { nombre: "Córdoba", municipios: ["Montería", "Lorica", "Sahagún", "Cereté"] },
      { nombre: "Magdalena", municipios: ["Santa Marta", "Ciénaga", "Fundación", "El Banco"] },
      { nombre: "Meta", municipios: ["Villavicencio", "Acacías", "Granada", "Puerto López"] },
      { nombre: "Risaralda", municipios: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"] },
      { nombre: "Otro", municipios: ["Otro departamento"] }
    ]
  },
  {
    nombre: "España",
    codigo: "+34",
    bandera: "🇪🇸",
    departamentos: [
      { nombre: "Madrid", municipios: ["Madrid", "Alcalá de Henares", "Móstoles", "Fuenlabrada", "Leganés", "Getafe", "Alcorcón", "Parla", "Torrejón de Ardoz", "Alcobendas"] },
      { nombre: "Barcelona", municipios: ["Barcelona", "Hospitalet de Llobregat", "Badalona", "Sabadell", "Terrassa", "Mataró", "Santa Coloma de Gramenet"] },
      { nombre: "Valencia", municipios: ["Valencia", "Torrente", "Gandia", "Sagunto", "Paterna"] },
      { nombre: "Sevilla", municipios: ["Sevilla", "Dos Hermanas", "Alcalá de Guadaíra", "Utrera"] },
      { nombre: "Alicante", municipios: ["Alicante", "Elche", "Torrevieja", "Orihuela", "Benidorm"] },
      { nombre: "Málaga", municipios: ["Málaga", "Marbella", "Fuengirola", "Mijas", "Torremolinos", "Estepona"] },
      { nombre: "Murcia", municipios: ["Murcia", "Cartagena", "Lorca", "Molina de Segura"] },
      { nombre: "Otro", municipios: ["Otra provincia"] }
    ]
  },
  {
    nombre: "Argentina",
    codigo: "+54",
    bandera: "🇦🇷",
    departamentos: [
      { nombre: "Buenos Aires", municipios: ["Buenos Aires", "La Plata", "Mar del Plata", "Bahía Blanca", "San Isidro", "Tandil", "San Nicolás"] },
      { nombre: "Córdoba", municipios: ["Córdoba", "Río Cuarto", "Villa María", "San Francisco"] },
      { nombre: "Santa Fe", municipios: ["Rosario", "Santa Fe", "Venado Tuerto", "Rafaela"] },
      { nombre: "Mendoza", municipios: ["Mendoza", "San Rafael", "Godoy Cruz", "Las Heras"] },
      { nombre: "Tucumán", municipios: ["San Miguel de Tucumán", "Yerba Buena", "Tafí Viejo"] },
      { nombre: "Otro", municipios: ["Otra provincia"] }
    ]
  },
  {
    nombre: "Perú",
    codigo: "+51",
    bandera: "🇵🇪",
    departamentos: [
      { nombre: "Lima", municipios: ["Lima", "San Juan de Lurigancho", "San Martín de Porres", "Ate", "Comas", "Villa El Salvador", "Ventanilla", "La Victoria", "San Juan de Miraflores"] },
      { nombre: "Arequipa", municipios: ["Arequipa", "Cayma", "Cerro Colorado", "Yanahuara", "Paucarpata"] },
      { nombre: "La Libertad", municipios: ["Trujillo", "Huanchaco", "Victor Larco Herrera"] },
      { nombre: "Piura", municipios: ["Piura", "Castilla", "Sullana", "Paita"] },
      { nombre: "Cusco", municipios: ["Cusco", "San Jerónimo", "San Sebastián", "Wanchaq"] },
      { nombre: "Otro", municipios: ["Otro departamento"] }
    ]
  },
  {
    nombre: "Chile",
    codigo: "+56",
    bandera: "🇨🇱",
    departamentos: [
      { nombre: "Región Metropolitana", municipios: ["Santiago", "Puente Alto", "Maipú", "La Florida", "Las Condes", "San Bernardo", "Peñalolén", "Pudahuel"] },
      { nombre: "Valparaíso", municipios: ["Valparaíso", "Viña del Mar", "San Antonio", "Quilpué", "Villa Alemana"] },
      { nombre: "Biobío", municipios: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel"] },
      { nombre: "Otro", municipios: ["Otra región"] }
    ]
  },
  {
    nombre: "Otro",
    codigo: "+",
    bandera: "🌍",
    departamentos: [
      { nombre: "Otro país", municipios: ["Otra ciudad"] }
    ]
  }
];

// Función para obtener los departamentos de un país
export function getDepartamentos(paisNombre: string): Departamento[] {
  const pais = paises.find(p => p.nombre === paisNombre);
  return pais ? pais.departamentos : [];
}

// Función para obtener los municipios de un departamento
export function getMunicipios(paisNombre: string, departamentoNombre: string): string[] {
  const pais = paises.find(p => p.nombre === paisNombre);
  if (!pais) return [];
  const departamento = pais.departamentos.find(d => d.nombre === departamentoNombre);
  return departamento ? departamento.municipios : [];
}

// Función para obtener el código de país
export function getCodigoPais(paisNombre: string): string {
  const pais = paises.find(p => p.nombre === paisNombre);
  return pais ? pais.codigo : "+";
}
