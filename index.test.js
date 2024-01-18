import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

let dom, container;

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
const script = fs.readFileSync(path.resolve(__dirname, "./index.js"), "utf8");
//comment;
beforeEach(async () => {
  dom = new JSDOM(html, { runScripts: "dangerously" });
  container = dom.window.document;

  let scriptElement = dom.window.document.createElement("script");
  scriptElement.textContent = script;
  dom.window.document.head.appendChild(scriptElement);

  await new Promise((resolve) => dom.window.addEventListener("load", resolve));
});

test("Challenge 1.1: image'lara mouseenter eventleri doğru şekilde eklenmiş", () => {
  const images = container.querySelectorAll("img");
  images.forEach((image) => {
    image.dispatchEvent(new dom.window.MouseEvent("mouseenter"));
    expect(image.classList.contains("grayscale")).toBe(true);
  });
});

test("Challenge 1.2: image'lara mouseleave eventleri doğru şekilde eklenmiş", () => {
  const images = container.querySelectorAll("img");
  images.forEach((image) => {
    image.dispatchEvent(new dom.window.MouseEvent("mouseenter"));
    expect(image.classList.contains("grayscale")).toBe(true);
    image.dispatchEvent(new dom.window.MouseEvent("mouseleave"));
    expect(image.classList.contains("grayscale")).toBe(false);
  });
});

test("Challenge 2.1: sayfa'da 1 tuşuna basınca theme1(turkuaz) aktif oluyor", () => {
  dom.window.dispatchEvent(
    new dom.window.KeyboardEvent("keydown", { key: "1" })
  );
  expect(container.querySelector("body").getAttribute("class")).toBe("theme1");
});

test("Challenge 2.2: sayfa'da 2 tuşuna basınca theme2(yeşil) aktif oluyor", () => {
  dom.window.dispatchEvent(
    new dom.window.KeyboardEvent("keydown", { key: "2" })
  );
  expect(container.querySelector("body").getAttribute("class")).toBe("theme2");
});

test("Challenge 2.3: sayfa'da 3 tuşuna basınca theme3(pembe) aktif oluyor", () => {
  dom.window.dispatchEvent(
    new dom.window.KeyboardEvent("keydown", { key: "3" })
  );
  expect(container.querySelector("body").getAttribute("class")).toBe("theme3");
});

test("Challenge 2.4: sayfa'da ESC tuşuna basınca theme sıfırlanıyor.", () => {
  /*
  dom.window.dispatchEvent(
    new dom.window.KeyboardEvent('keydown', { key: '3' })
  );
  expect(container.querySelector('body').getAttribute('class')).toBe('theme3');
  */
  dom.window.dispatchEvent(
    new dom.window.KeyboardEvent("keydown", { key: "Escape" })
  );
  expect(container.querySelector("body").getAttribute("class")).not.toBe(
    "theme3"
  );
});

test("Challenge 3.1: input alanına karakterler girince büyük harfe dönüşüyor", () => {
  const input = container.querySelector("input");
  input.value = "emre şahiner";
  input.dispatchEvent(new dom.window.InputEvent("input"));
  expect(input.value).toBe("EMRE ŞAHINER");
});

test("Challenge 3.2: input alanına 5 karakterden fazla girilince input alanı enabled oluyor", () => {
  const input = container.querySelector("input");
  const button = container.querySelector("button");

  input.value = "emre şahiner";
  input.dispatchEvent(new dom.window.InputEvent("input"));
  expect(button.disabled).toBe(false);
});

test("Challenge 3.3: input alanına 5 karakterden az girilince input alanı disabled oluyor", () => {
  const input = container.querySelector("input");
  const button = container.querySelector("button");

  input.value = "emre şahiner";
  input.dispatchEvent(new dom.window.InputEvent("input"));
  expect(button.disabled).toBe(false);
  input.value = "emre";
  input.dispatchEvent(new dom.window.InputEvent("input"));

  expect(button.disabled).toBe(true);
});

test("Challenge 4.1: form submit edildiğinde submitResult id'li paragrafta doğru metni gösteriyor", () => {
  const input = container.querySelector("input");
  const button = container.querySelector("button");
  const result = container.querySelector("#submitResult");

  input.value = "emre şahiner";
  input.dispatchEvent(new dom.window.InputEvent("input"));
  button.dispatchEvent(new dom.window.MouseEvent("click"));
  expect(result.textContent).toBe("EMRE ŞAHINER başarı ile kaydedildi...");
});

test("Challenge 4.2: form submit edildiğinde input alanı sıfırlanıyor", () => {
  const input = container.getElementsByTagName("input")[0];
  const button = container.querySelector("button");

  input.value = "emre şahiner";
  input.dispatchEvent(new dom.window.InputEvent("input"));
  button.dispatchEvent(new dom.window.MouseEvent("click"));
  expect(input.value).toBe("");
});

test("Challenge 4.3: form submit edildiğinde kaydet buton'u tekrar disabled oluyor", () => {
  const input = container.getElementsByTagName("input")[0];
  const button = container.querySelector("button");

  input.value = "emre şahiner";
  input.dispatchEvent(new dom.window.InputEvent("input"));
  expect(button.disabled).toBe(false);
  button.dispatchEvent(new dom.window.MouseEvent("click"));
  expect(button.disabled).toBe(true);
});
