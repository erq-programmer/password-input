/* Komponent ma działać tak:
  1. Na podstawie {password} generuje więcej niż password.length inputów jednoznakowych.
    - Czy length ma być stały, że np. hasło może mieć 8-32 znaków i wtedy generujemy w UI 32 inputy?
    - Czy robimy coś w stylu logowania bankowego, że najpierw użytkownik podaje login, po czym wyświetlają się mu te inputy? (w treści zadania jest tylko mowa o odtworzeniu tych inputów)?
  2. Komponent losowo blokuje niektóre inputy na pojedyncze znaki:
    - Co to znaczy, że losowo blokujuje niektóre inputy na pojedyncze znaki? 
    - Rozumiem to tak jeżeli hasło ma 10 inputów to blokujemy losowo np. 2, 4, 6, 9, 10 input (inputy powyżej 10 są z automatu zablokowane) i użytkownik musi wprowadzić w odblokowanych miejscach hasło?
  3. Prop onSuccess zostaje wywołany jeśli wszystkie inputy uzupełnione, wraz z literami oraz ich pozycją, które wpisał user
*/

/* ************************************************************************************ */

/* Testy mają działać tak: 
  1. Jak zostanie podany {password} to sprawdzamy czy jest generowane więcej length inputów.
  2. Sprawdzenie czy losowo są blokowane inputy.
  3. Sprawdzenie czy zostaje wywołany prop onSuccess jeżeli wszystkie inputy są uzupełnione przez usera poprawnie.
*/

describe('PasswordInput Component tests', () => {
  it('My Test Case 1', () => {
    expect(true).toEqual(true);
  });
});
