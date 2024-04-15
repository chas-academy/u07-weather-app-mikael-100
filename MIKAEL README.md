Introduktion:

Jag började med att kolla över några väder appar. Efter det så gjorde jag en enkel skiss i figma på hur min app skulle kunna tänkas se ut. Jag gjorde denna skiss för att få en aning om hur många komponenter jag borde ha och hur jag ska strukturera dem.



Search:

Min Search har två select val dygn och unit och i min searchbar ska man kunna söka väder för den platsen man är på. Jag började med att lägga detta i en form sedan gjorde jag två select som har var sin default. Jag gjorde en useState med tre styckene variabler i day, unit och ord. För att binda de som sätts i inputen till respektive variabel så gjorde jag så att i value targetade jag värderna i UseState.


![alt text](<MIKAEL README BILDER/image.png>)

Genom att i value definera variabel inputs och sedan använda punkt för att komma åt den specifika variabeln day har jag nu satt upp så att när användaren gör ett val och sätter in ett värde så uppdateras inputs.day med detta värde i useState.

![alt text](<MIKAEL README BILDER/image2.png>)

För att sedan kunna binda denna data från formen och kunna skicka över variablerna till en annan komponent så valde jag att göra en onChange på varje select och på input fältet. Denna kommer trigga formData. 

onChange ligger nu som en lyssnare på selecten och känner av om användaren interagerar.

![alt text](<MIKAEL README BILDER/image3.png>)

När onChange triggar formData så kommer namne och value från denna tag att bindas till name value i formData. event är på den onChange som triggades och target är vilket värde som den ska ta och value eller name är värdet den ska binda.

Värdenna från select är nu bundna till const name och const value. Dessa sätts sedan in i setInpunts där [name]: = namnet på variabeln och value är värdet. ...values används för att kunna spara alla fina olika värden och variabler i samma funktion. ...value är ett object som skapar en kopia av ett annat projekt.

![alt text](<MIKAEL README BILDER/image4.png>)




