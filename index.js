//Global variable
const domElementsObj = {
  btnElement: document.querySelector("button "),
  inputElement: document.querySelector("input"),
  formElement: document.querySelector("form"),
  parag: document.getElementById("submitResult"),
  tempBody: document.getElementsByTagName("body")[0],
};

// Challenge 1: dokümandaki tüm resimlerin üzerine mouse ile gelince(mouseenter) üzerine gelinen resme class olarak grayscale eklensin. mouse çıkınca(mouseleave) grayscale classı çıkarılsın.

function mouseEnter() {
  let domImg = Array.from(document.getElementsByTagName("img"));
  domImg.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      item.classList.add("grayscale");
    });
  });
}

function mouseLeave() {
  let domImg = document.querySelectorAll("img");
  domImg.forEach(function (item) {
    item.addEventListener("mouseleave", function () {
      item.classList.remove("grayscale");
    });
  });
}

mouseLeave();
mouseEnter();

/*
Challenge 2: sayfa aktif iken(herhangi bir yerine mouse ile tıklayınca):
- klavyedeki 1 tuşuna basınca body'e theme1, 2'ye basınca theme2, 3'e basınca theme3 classlarını eklesin.
- "Esc" tuşuna basınca classı sıfırlasın
*/

const checkNumber1 = (keyName, tempBody) => {
  if (keyName === "1") {
    if (tempBody.getAttribute("class") === null) {
      tempBody.className = "";
    }
    console.log("is it true", tempBody.getAttribute("class") === null);
    if (
      tempBody.classList.contains("theme2") ||
      tempBody.classList.contains("theme3")
    ) {
      tempBody.className = "";
    }
    console.log("keyname ", keyName);
    tempBody.className = "theme1";
    //tempBody.classList.add("theme1");
    console.log(
      "Current Body Teheme => ",
      domElementsObj.tempBody.getAttribute("class")
    );
  }
};

const checkNumber2 = (keyName, tempBody) => {
  if (keyName === "2") {
    if (tempBody.getAttribute("class") === null) {
      tempBody.className = "";
    }
    console.log("is it true", tempBody.getAttribute("class") === null);
    if (
      tempBody.classList.contains("theme1") ||
      tempBody.classList.contains("theme3")
    ) {
      tempBody.className = "";
    }
    console.log("keyname ", keyName);
    tempBody.className = "theme2";
    //tempBody.classList.add("theme2");
    console.log(
      "Current Body Teheme => ",
      domElementsObj.tempBody.getAttribute("class")
    );
  }
};

const checkNumber3 = (keyName, tempBody) => {
  if (keyName === "3") {
    if (tempBody.getAttribute("class") === null) {
      tempBody.className = "";
    }
    console.log("is it true", tempBody.getAttribute("class") === null);
    if (
      tempBody.classList.contains("theme1") ||
      tempBody.classList.contains("theme2")
    ) {
      tempBody.className = "";
    }
    console.log("keyname ", keyName);
    tempBody.className = "theme3";
    //tempBody.classList.add("theme3");
    console.log(
      "Current Body Teheme => ",
      domElementsObj.tempBody.getAttribute("class")
    );
  }
};

const checkNumberEscape = (keyName, tempBody) => {
  if (keyName === "Escape") {
    if (tempBody.getAttribute("class") === null) {
      tempBody.className = "";
      //tempBody.classList.remove("theme3");
      console.log("is it true", tempBody.getAttribute("class") === null);
      console.log("keyname ", keyName);
      console.log(
        "Current Body Teheme => ",
        domElementsObj.tempBody.getAttribute("class")
      );
    }
    tempBody.className = "";
    //tempBody.classList.remove("theme3");
  }
};

function addTheme() {
  //document.addEventListener("click", () => {
  document.addEventListener("keydown", (e) => {
    let keyName = e.key;
    checkNumber1(keyName, domElementsObj.tempBody);
    checkNumber2(keyName, domElementsObj.tempBody);
    checkNumber3(keyName, domElementsObj.tempBody);
    checkNumberEscape(keyName, domElementsObj.tempBody);
    e.preventDefault();
    return false;
  });
  //});
}

addTheme();

/*
Challenge 3: Input alanına bir şeyler yazınca(input event):
- Büyük harfe dönüştürsün
- 5 karakter'den büyük olduğunda buttonı enabled etsin. küçük ise disabled etsin.
*/

/*
Challenge 4: Form submit edildiğinde;
- input alanındaki metni alıp, id'si submitResult olan paragrafa metin olarak "{value} başarı ile kaydedildi..." yazsın.
- input alanını sıfırlasın.
- kaydet butonunu disabled yapsın.
*/

const listenEvent = () => {
  domElementsObj.inputElement.addEventListener("input", (e) => {
    changeContent(e);
    checkInputValueLength(e);
  });
};

const changeContent = (dom) => {
  dom.target.value = dom.target.value.toUpperCase();
  val = dom.target.value;
};

const checkInputValueLength = (dom) => {
  dom.target.value.length >= 5
    ? (domElementsObj.btnElement.disabled = false)
    : (domElementsObj.btnElement.disabled = true);
};

listenEvent();

const formSubmit = () => {
  domElementsObj.formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    domElementsObj.parag.textContent = `${domElementsObj.inputElement.value} başarı ile kaydedildi...`;
    domElementsObj.inputElement.value = "";
    domElementsObj.btnElement.disabled = true;
  });
};

formSubmit();
