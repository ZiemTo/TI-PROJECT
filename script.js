
var background;
var flag1 = 0;
/**
 * @class
 * Klasa list przechowuje statyczne metody, które są używane przy operacjach na liście zadań.
 */
class List {
  /**
   * Rozszerzenie metody ResizeTextarea. Metoda wywołuje się dzięki window.addEventListener("resize") i reaguje na zmianę rozmiaru okna.
   * W tej metodzie również pojawia się sprawdzenie czy tekst zajmuja najmniejszą możliwą wysokość.
   * (Przypadek, kiedy użytkownik zmniejsza szerokość okna, a następnie znowu zwiększa - wysokość jest zawsze możliwie najmniejsza).
   * Z tej metody wywoływana jest metoda ResizeTexarea ustawiająca odpowiednią wysokość.
   */
  static ResizeTextareawindow() {
    const tasks = document.querySelectorAll("textarea");
    tasks.forEach((task) => {
      var currentHeight = task.scrollHeight;
      task.style.height = "0";
      var minHeight = task.scrollHeight;
      task.style.height = currentHeight + "px";
      if (currentHeight > minHeight) {
        task.style.height = minHeight + "px";
      }
      List.ResizeTextarea(task);
    });
  }
  /**
   * Metoda statyczna ResizeTextarea przyjmuje zadanie dla którego mają wykonać się operacje.
   * Metoda służy do dynamicznego zmieniania wysokości elementu textarea tak, aby cały tekst zadania był widoczny.
   * Metoda sprawdza czy tekst zajmuje najmniejszą dostępną przestrzeń i jeśli nie to taką ustawia 
   * (przypadek, kiedy użytkownik zmienia treść zadania na krótszą - rozmiar textarea się zmniejsza)
   * Działanie metody to ustawienie wysokości elementu textarea równej całemu obszarowi jaki zajmuje treść zadania w elemencie.
   * Wysokość tego obszaru jest pobierana za pomocą .scrollHeight
   * @param {object} task zaadnie, dla którego wywoływana jest funkcja
   */
  static ResizeTextarea(task) {
    var currentHeight = task.scrollHeight;
    task.style.height = "0";
    var minHeight = task.scrollHeight;
    task.style.height = currentHeight + "px";
    if (currentHeight > minHeight) {
      task.style.height = minHeight + "px";
    }
    task.setAttribute("style", "height:" + task.scrollHeight + "px;");
  }
  /**
   * Metoda AddTask() pozwala dodać kolejne zadania do listy. Wywołuje się po naciścięciu przycisku Add znajdującego się na dole listy.
   * Metoda tworzy nowy element HTML, ustawia mu odpowiednią klasę i dodaje do znaczniki HTML tworzące zadanie. Następnie taki element
   * jest dołączany do kontenera z zadaniami za pomocą appendChild. W kolejnym etapie dla każdego nowego elementu dodawany jest eventlistener, 
   * dzięki któremu skrytp może obłużyć operacje ukrywania na bieżąco zaznaczanych zadań
   */
  static AddTask() {
    const newspan = document.createElement("span");
    newspan.setAttribute("class", "spantask");
    newspan.innerHTML =
      '<input type="checkbox" name="task" onclick="List.Cross(this)" class="taskcheck "> <label for="task"><textarea class="task"  maxlength="80" oninput="List.ResizeTextarea(this)" placeholder="Write your task here" ></textarea></label>';
    document.querySelector("#tasks").appendChild(newspan);
    var checkboxes = document.querySelectorAll(".taskcheck");
    checkboxes.forEach((checkbox) => {
      if (document.querySelector("#btn1").getAttribute("class") == "hidden-span") {
        checkbox.addEventListener("change", List.HideTasks);
      }
    });
  }
  /**
   * Metoda asynchroniczna HideTasks() umożliwia ukrywanie zadań, które zostały zaznaczone jako wykonane. Metoda jest opóżniona
   * dzięki instrukncji await - metoda czeka aż wykona się funkcja setTimeout i dopiero wtedy kontynuuje działanie.
   * Metoda pobiera wszystkie elementy checkbox i sprawdza czy są zaznaczone. Jeśli tak - zadaniu zostaje ustaiona klasa służąca do
   * ukrywania elementów. Oprócz tego każdy checkbox dostaje eventlistener aby móc wyłapać czy został zaznaczony.
   * Na końcu metody następuje podmiana przycisków, tak aby widoczny był przycisk Show. 
   */
  static async HideTasks() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    var checkboxes = document.querySelectorAll(".taskcheck");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.parentElement.setAttribute("class", "hidden-span");
      }
      checkbox.addEventListener("change", List.HideTasks);
    });
    document.querySelector("#btn1").setAttribute("class", "hidden-span");
    document.querySelector("#btn2").removeAttribute("class");
  }
  /**
   * Metoda ShowTasks() służy do ponownego pokazania ukrytych zadań. Przycisk wywołujący tę metodę nie jest domyślnie widoczny. Pojawia
   * się dopiero po naciśnięciu przycisku Hide. Metoda pobiera wszystkie elementy checkbox i sprawdza czy są zaznaczone. Następnie 
   * ustawia odpowiadającym im zadaniom klasę, dzięki której są ponownie widoczne i usuwany jest eventListener wywołujący metodę HideTask
   * przy zmianie stanu checkboxa. Na końcu metody następuje podmiana przycisków, tab aby ponownie widoczny był przycisk Hide.  
   */
  static ShowTasks() {
    var checkboxes = document.querySelectorAll(".taskcheck");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.parentElement.setAttribute("class", "spantask");
      }
      checkbox.removeEventListener("change", List.HideTasks);
    });
    document.querySelector("#btn1").removeAttribute("class");
    document.querySelector("#btn2").setAttribute("class", "hidden-span");
  }
  /**
   * Metoda Cross służy do wykreślania zadania, które zostało oznaczone jako wykonane. Jako parametr przyjmuje element checkbox,
   * dla którego zostaje wywołana, następnie sprawdza czy jest zaznaczony (metoda wywołuje się przez zdarzenie onchange, więc
   * wywołała się także jeśli checkbox zostaje odznaczony). Jeśli checkbox jest zaznaczony to odpowiadającemu mu zadaniu zostaje 
   * nałożony styl przekreślenia. Jeśli nie jest zaznaczony(przypadek, gdzie zaznaczony checkbox zostaje odznaczony) to dtyl ten \
   * jest usuwany.
   * @param {object} checkbox Parametr checkbox przyjmuje element HTML checkbox, dla którego jest wywoływana metoda.
   */
  static Cross(checkbox) {
    console.log(typeof (checkbox))
    if (checkbox.checked) {
      checkbox.nextSibling.nextSibling.firstChild.classList.add("crossed");
    } else {
      checkbox.nextSibling.nextSibling.firstChild.classList.remove("crossed");
    }
  }
}
/**
 * Klasa Background przechowuje metody związane ze zmianą tła i zachodzącą animacją podczas tego procesu.
 * @class
 */
class Background {
  /**
   * Metoda fadeOut służy do wygaszania starego tła podczas zmiany na inne. Oblicza o jaką wartość ma być zmieniana przezroczystość
   * tzn. "krok" przezroczystości (delta) jest równy czasowi trwania jednego przejścia (interval) podzielonemu przez czas trwania
   * animacji (duration). Następnie tworzona jest funkcja odejmująca krok od obecnej przezroczystości i ustawiająca przezrozystość elementowi img.
   * Funkcja jest wywoływana w odstępach równych czasowi jedego kroku i wywoływanie kończy się w momencie, kiedy przezroczystość osiągie wartość
   * mniejszą lub równą 0.4.
   * @param {object} bg Element HTML <img>  
   * @param {int} duration Czas trwania animacji
   */
  static fadeOut(bg, duration) {
    var opacity = 1;
    var interval = 20;
    var delta = interval / duration;
    function decrease() {
      opacity -= delta;
      bg.style.opacity = opacity;
      if (opacity <= 0.4) {
        clearInterval(fadeEffect);
      }
    }
    var fadeEffect = setInterval(decrease, interval);
  }
  /**
   * Metoda fadeIn  służy do powolnego wyświetlania nowego tła. Oblicza o jaką wartość ma być zmieniana przezroczystość
   * tzn. "krok" przezroczystości (delta) jest równy czasowi trwania jednego przejścia (interval) podzielonemu przez czas trwania
   * animacji (duration). Następnie tworzona jest funkcja dodająca krok do obecnej przezroczystości i ustawiająca przezrozystość elementowi img.
   * Funkcja jest wywoływana w odstępach równych czasowi jedego kroku i wywoływanie kończy się w momencie, kiedy przezroczystość osiągie wartość
   * większą lub równą 1.
   * @param {object} bg Element HTML <img>  
   * @param {int} duration Czas trwania animacji
   */
  static fadeIn(bg, duration) {
    var opacity = 0.2;
    var interval = 20;
    var delta = interval / duration;
    bg.style.opacity = opacity;
    function increase() {
      opacity += delta;
      bg.style.opacity = opacity;

      if (opacity >= 1) {
        clearInterval(fadeEffect);
      }
    }
    var fadeEffect = setInterval(increase, interval);
  }
  /**
   * Metoda wywoływana przez naciśnięcie przycisku w menu w sekcji wyboru tła. Metoda pobiera ścieżkę do obrazu i znacznik img.
   * Następnie wywoływana jest metoda wygaszająca tło, po odczekaniu 500 ms tło jest ustawiane na to wybrane przez użytkownika
   * i zostaje wywołana metoda z animacją pojawiania się. Na końcu metoda zapisuje wybrane tło w local storage.
   * @param {object} a odnośnik do odwopwiedniego tła 
   */
  static SetBackground(a) {
    var div = document.querySelector(a.getAttribute("href"));
    var src = div.firstChild.nextSibling.getAttribute("src");
    var background = document.querySelector("#background");
    Background.fadeOut(background, 500);
    setTimeout(function () {
      background.setAttribute("src", src);
      Background.fadeIn(background, 900);
    }, 300);
    localStorage.setItem("background", src);
  }
}
/**
 * Funkcja służy do zapobiegania wpisywaniu niepożądanych wartości do input type number. Pobierane są wszystkie pola tego typu i
 * dla każdego z nich ustawiany jest eventListener, dzięki któremu przy każdej próbie wprowadzenia danych do pola zostaje sprawdzany
 * warunek czy wprowadzana wartość na pewno jest wartością liczbową. Funkcja ta zapobiega wpisywaniu znaków takich jak "e", "+", "-","="
 */
function OnlyNumberInput() {
  inp = document.querySelectorAll('input[type="number"]');
  inp.forEach((x) => {
    x.addEventListener("keypress", function (evt) {
      if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
        evt.preventDefault();
      }
    });
  });
}
/**
 * Funkcja dodaje event listener na obiekt window, nasłuchując zdarzenia "resize". Kiedy rozmiar okna przeglądarki zostanie zmieniony
 * (np. przez użytkownika zmieniającego rozmiar okna), zostanie wywołana funkcja List.ResizeTextareawindow.
 * Funkcja służy do zapisywania do localstorage zadań z listy. Funkcja zawiera podfunkcję, która służy do obsługi zachodzących zmian.
 * Sama informacja o konkretnej zmianie nie jest wykorzystywana. Chodzi tu o wykrycie czy zmiana zaszła czy nie. Przy każdej zmianie
 * zachodzącej na liście pobierane są wszystkie zadania z listy i następnie zapisywane są treści tych zadań, które nie są puste i które 
 * nie są zaznaczone. Po stworzeniu tablicy jest ona zapisywana w formacie JSON do local storage. Aby móc wykryć czy zmiana na liście zachodzi,
 * utowrzono obiekt MutationObserver odwołujący się do wcześniej opisanej funkcji. Następnie zdefiniowano jaki element DOM ma być "obserwowany"
 * i zdefiniowano konfigurację obserwacji (obserwuj tekst, obserwuj wszystkich potomków, obserwuj atrybuty). W ostatniej linii rozpoczynana
 * jest obserwacja podanego elementu z podaną konfiguracją.

 */
function CheckChanges() {
  window.addEventListener("resize", List.ResizeTextareawindow);
  function handleMutation(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      let savetasks = document.querySelectorAll(".spantask>label>textarea");
      var values = [];
      i = 0;
      savetasks.forEach((savetask) => {
        if (!savetask.value.length < 1 && !savetask.parentElement.previousSibling.previousSibling.checked) {
          values[i] = savetask.value;
          i++;
        }
      });
      values = JSON.stringify(values);
      localStorage.setItem("savedtasks", values);
    });
  }
  const observer = new MutationObserver(handleMutation);
  const targetElement = document.querySelector(".list");
  const config = { characterData: true, attributes: true, subtree: true };
  observer.observe(targetElement, config);
}
/**
 * Funkcja przywraca domyślne ustawienia użytkownika po przeładowaniu przeglądarki.
 * Funkcja rozpoczyna się od sprawdzenia, czy w lokalnym składowisku (localStorage) istnieje zapisane tło (background).
 * Jeśli tak, ustawia atrybut "src" dla elementu o identyfikatorze "background" na wartość zapisaną w localStorage. Następnie funkcja
 * sprawdza, czy są zapisane zadania (savedtasks) w localStorage. Jeżeli tak, parsuje te zadania z formatu JSON. Dla każdego zapisanego 
 * zadania, tworzony jest nowy element span, który reprezentuje zadanie w interfejsie. Ustawia się odpowiednie atrybuty i strukturę HTML 
 * dla każdego zadania, a następnie dodaje się do listy zadań. Treści zapisanych zadań są wczytywane do textarea 
 * dla każdego utworzonego elementu span. Kolejnym etapem jest sprawdzenie plików cookie w poszukiwaniu zapisanych wartości minut (minutes)
 * i sekund (seconds). Jeśli takie wartości istnieją, są one używane do ustawienia odpowiednich pól input dla czasu. W przeciwnym razie, 
 * ustawiane są domyślne wartości "00".
 */
function SetPrevious() {
  if (localStorage.getItem("background") != null) {
    document.querySelector("#background").setAttribute("src", localStorage.getItem("background"));
  }
  if (localStorage.getItem("savedtasks") != null) {
    let savedtasks = JSON.parse(localStorage.getItem("savedtasks"));
    savedtasks.forEach((task) => {
      const newspan = document.createElement("span");
      newspan.setAttribute("class", "spantask");
      newspan.innerHTML =
        '<input type="checkbox" name="task" onclick="List.Cross(this)" class="taskcheck "> <label for="task"><textarea class="task"  maxlength="80" oninput="List.ResizeTextarea(this)" placeholder="Write your task here" ></textarea></label>';
      document.querySelector("#tasks").appendChild(newspan);
      newspan.firstChild.nextSibling.nextSibling.firstChild.value = task;
    });
  }
  if (getCookie("minutes").length > 0) {
    document.querySelector("#time").firstChild.nextSibling.setAttribute("value", getCookie("minutes"));
  } else
    document.querySelector("#time").firstChild.nextSibling.setAttribute("value", "00");
  if (getCookie("seconds").length > 0) {
    document.querySelector("#time").lastChild.previousSibling.setAttribute("value", getCookie("seconds"));
  } else
    document.querySelector("#time").lastChild.previousSibling.setAttribute("value", "00");
}
/**
 *  Funkcja dokonuje dekodowania wszystkich ciasteczek na stronie za pomocą decodeURIComponent(document.cookie).
 *  Uzyskane ciasteczka są podzielone na elementy tablicy przy użyciu separatora ";", a następnie iteruje przez
 *  te elementy, aby znaleźć ciasteczko o oczekiwanej nazwie. W przypadku odnalezienia ciasteczka o prawidłowej 
 *  nazwie, funkcja zwraca jego wartość. W przeciwnym razie, zwraca pusty ciąg znaków.
 * @param {String} cname nazwa poszukiwanego ciasteczka
 * @returns wartość ciasteczka lub pusty ciąg znaków
 */
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/**
 * Funkcja służąca do wyłączenia banera wyśwetlającego się na górze strony. Element top dostaje styl display:none.
 */
function Close() {
  document.querySelector("#top").setAttribute("style", "display:none;");
}
/**
 * Funkcja służąca do zamknięcia menu rozwijanego. Ustawia szerokość elementu 0.
 */
function closeNav() {
  document.querySelector("#menu").style.width = "0";
}
/**
 * Funkcja służąca do otwierania menu rozwijanego. Ustawia szerokość elementu na 280px.
 */
function openNav() {
  document.querySelector("#menu").style.width = "280px";
}
/**
 * Funkcja jest odpowiedzialna za dynamiczne sterowanie widocznością zawartości elementu listy po jego kliknięciu.
 * Przyjmuje ona element listy jako argument. Funkcja analizuje, czy zawartość pierwszego dziecka elementu li 
 * ma wartość ">". W przypadku, gdy warunek ten jest spełniony, funkcja zmienia zawartość pierwszego dziecka na "∨" i
 * usuwa klasę "hidden-span" z następnego rodzeństwa elementu li. Jeśli jednak warunek nie jest spełniony (czyli zawartość
 * pierwszego dziecka nie jest ">"), funkcja zmienia zawartość pierwszego dziecka na ">" i dodaje klasę "hidden-span"
 * do następnego rodzeństwa elementu li. W rezultacie, funkcja kontroluje widoczność zawartości w zależności od aktualnego 
 * stanu elementu listy po kliknięciu.
 * @param {object} li element listy pokazywany / chowany
 */
function ShowContent(li) {
  if (li.firstChild.innerHTML == "&gt;") {
    li.firstChild.innerHTML = "&or;";
    li.nextSibling.nextSibling.classList.remove("hidden-span");
  } else {
    li.firstChild.innerHTML = "&gt;";
    li.nextSibling.nextSibling.classList.add("hidden-span");
  }
}

/**
 * Funkcja odpowiada za działanie timera. Na początku sprawdzane są warunki czy wpisany czas  jest zerowy i czy funkcja już się nie wykonuje. (flag==1)
 * Jeżeli któryś z tych warunków jest spełniony funkcja przerywa swoje działanie. Kiedy funkcja może się wykonać flaga jest ustawiana na 1.
 * Wyłączana jest możliwość zmiany wartości w czasie odliczania. Maksymalna wartość jaką można odmierzyć to 1 godzina. W przypadku kiedy użytkownik
 * wprowadza wartości większe, wykonują się odpowiednie przeliczenia i zmiany. Np jeśli użytkownik poda w polu sekund 71, to w rezultacie w polu sekund
 * pojawi się 11, a do minut doda się 1. Jeśli użytkownik wprowadzi więcej niż 59 minut, wtedy wartość jest ustawiana na 59. Następnie funkcja stosuje 
 * konwersję na liczbę i znowu na tekst, aby pozbyć się zer z przodu (problem z dodatkowymi zerami przy zatrzymywaniu i włączaniu licznika).
 * Funkcja dodaje zera na początek do liczb mniejszych od 10. Jeśli wartość w polu minut jest równa 0 to jest podmieniana na -1. To rozwiązuje problem 
 * kiedy funkcja odliczająca wywołuje się jeszcze raz kiedy licznik zejdzie do 0. Następnie tworzona jest podfunkcja, która wywołuje się co 1s
 * i rozpatruje kilka przypadków. Jeśli wartość sekund jest <0 ale wartość minut nie, to do zmiennej sekundowej jest przywpisywana wartość 59,
 * a zmienna minutowa jest dekrementowana o 1. Oprócz tego zostają dopisywane zera na początku przy liczbach mniejszych niż 10 i w przypadku , kiedy 
 * zmienna minutowa wynosi -1, wypisywana jest wartość 00. Kiedy warunek nie jest spełniony wartości wpisują się zgodnie z dekrementowanymi zmiennymi i
 * dodatkowo są im dodawane zera na początku jeżeli zachodzi taka potrzeba. Następuje dekrementacja zmiennej sekundowej. Sprawdzany jest warunek czy 
 * sekundy i minuty <0 i jeśli tak to usuwany jest setinterval i funkcja przestaje się wykonywać oraz uruchamia się animacja poprzez nadanie 
 * odpowiednich klas cząsteczkom, które będą animowane. Po zakończeniu odliczania flaga jest ustawiana na 0, aby użytkownik znowu mógł uruchomić kolejne 
 * odliczanie. Na końcu zostają usuwane style powodujące brak możliwości wpisywania wartości do pól.
 * 
 */
function Start() {
  if (flag1 == 1) return;

  min = document.querySelector("#time").firstChild.nextSibling.value;
  sec = document.querySelector("#time").lastChild.previousSibling.value;
  if (min == "00" && sec == "00") {
    return;
  }
  flag1 = 1;
  document.querySelector(".time:first-child").setAttribute("style", "pointer-events:none;");
  document.querySelector(".time:last-child").setAttribute("style", "pointer-events:none;");
  if (sec >= 60) {
    min = Number(min);
    min += Number(Math.floor(sec / 60));
    sec = String(sec % 60);
    document.querySelector("#time").lastChild.previousSibling.value = sec;
  }

  if (min >= 60) {
    min = String(59);
    sec = String(59);
    document.querySelector("#time").firstChild.nextSibling.value = min;
    document.querySelector("#time").lastChild.previousSibling.value = sec;
  } else {
    min = String(min);
    document.querySelector("#time").firstChild.nextSibling.value = min;
  }

  min = Number(min);
  sec = Number(sec);
  min = String(min);
  sec = String(sec);
  document.querySelector("#time").firstChild.nextSibling.value = min;
  document.querySelector("#time").lastChild.previousSibling.value = sec;

  if (min < 10)
    document.querySelector("#time").firstChild.nextSibling.value = "0" + min;
  if (sec < 10)
    document.querySelector("#time").lastChild.previousSibling.value = "0" + sec;

  if (min == 0) min = -1;
  timer = setInterval(function () {
    if (min == 0) min = -1;
    if (sec < 0 && min >= 0) {
      sec = 59;
      min--;
      if (min < 10)
        document.querySelector("#time").firstChild.nextSibling.value =
          "0" + min;
      else document.querySelector("#time").firstChild.nextSibling.value = min;
      if (min == -1)
        document.querySelector("#time").firstChild.nextSibling.value = "00";
    }
    if (sec < 10)
      document.querySelector("#time").lastChild.previousSibling.value =
        "0" + sec;
    else document.querySelector("#time").lastChild.previousSibling.value = sec;
    sec--;
    if (sec < 0 && min < 0) {
      clearInterval(timer);
      part = document.querySelectorAll(".particle");
      part.forEach((par) => {
        par.classList.add("particle1");
      });
      setTimeout(function () {
        part = document.querySelectorAll(".particle");
        part.forEach((par) => {
          par.classList.remove("particle1");
        });
      }, 3000);
      flag1 = 0;
      document.querySelector(".time:first-child").removeAttribute("style");
      document.querySelector(".time:last-child").removeAttribute("style");
    }
  }, 1000);
}
/**
 * Funkcja służy do zatrzymywania odliczania. Funkcja odblokowuje pola do wpisywania wartości usuwając atrybut stylu i usuwa Interval, który
 * sprawia że zachodzi odlicznie. Następnie ustawia flagę na 0, żeby można było rozpocząć nowe.
 */
function Pause() {
  document.querySelector(".time:first-child").removeAttribute("style");
  document.querySelector(".time:last-child").removeAttribute("style");
  clearInterval(timer);
  flag1 = 0;
}
/**
 * Funkcja odpowiada za zapisywanie domyślnych wartości licznika w ciasteczkach. Funkcja definiuje nazwy dla dwóch tworzonych ciasteczek i pobiera
 * ich wartości z pól formularza. Następnie są stosowane procedury podobne jak w funkcji Start()- pozbywanie się zer, sprawdzanie czy wartości
 * nie przekraczają 59 i odpowiednie przeliczenia i dodawanie zer jeśli to konieczne. Funkcja tworzy datę wygaśnięcia ciasteczek - data odległa,
 * symulująca niewygasanie ciasteczek. Tworzone są ciasteczka z utworzonymi zmiennymi.
 */
function SetDefaultValues() {
  const cookieMinutes = "minutes";
  const cookieSeconds = "seconds";

  cookieMinutesValue = document.querySelector("#defaulttimer").firstChild.nextSibling.value;
  cookieSecondsValue = document.querySelector("#defaulttimer").lastChild.previousSibling.value;
  cookieMinutesValue = Number(cookieMinutesValue);
  cookieMinutesValue = String(cookieMinutesValue);
  cookieSecondsValue = Number(cookieSecondsValue);
  cookieSecondsValue = String(cookieSecondsValue);
  if (cookieSecondsValue >= 60) {
    cookieMinutesValue = Number(cookieMinutesValue);
    cookieMinutesValue += Number(Math.floor(cookieSecondsValue / 60));
    cookieSecondsValue = String(cookieSecondsValue % 60);
  }
  if (cookieMinutesValue >= 60) {
    cookieMinutesValue = String(59);
    cookieSecondsValue = String(59);
  }
  if (cookieMinutesValue < 10) cookieMinutesValue = "0" + cookieMinutesValue;
  if (cookieSecondsValue < 10) cookieSecondsValue = "0" + cookieSecondsValue;
  console.log(cookieMinutesValue);
  const exp = new Date(2147483647 * 1000).toUTCString();
  document.cookie = cookieMinutes + "=" + cookieMinutesValue + ";expires=" + exp;
  document.cookie = cookieSeconds + "=" + cookieSecondsValue + ";expires=" + exp;
}
/**
 * Funkcja tworząca ciasteczka o wartości 00, kiedy użytkownik usuwa domyślne ustawienia
 */
function ClearDefaultValues()
{
  document.cookie = "minutes = 00; expires=" + new Date(2147483647 * 1000).toUTCString();
  document.cookie = "seconds = 00; expires=" + new Date(2147483647 * 1000).toUTCString();
}
/**
 * Funkcja wywołująca się przy przesłaniu formularza, wyświetlająca komunikat z podziękowaniem za wypełnienie ankiety za pomocą .innerHTML
 */
function Submit() {
  document.querySelector(".content").innerHTML = "Thanks for your opinion!";
}
