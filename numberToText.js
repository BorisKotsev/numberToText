const prompt = require("prompt-sync")();

let output = "";

function convert(value) {
    let first = [
        "", "Един", "Двe", "Три", "Четири", "Пет",
        "Шест", "Седем", "Осем", "Девет", "Десет", "Единадесет",
        "Дванадесет", "Тринадесет", "Четиринадесет", "Петнадесет",
        "Шестнадесет", "Седемнадесет", "Осемнадесет", "Деветнадесет"
    ];

    let second = [
        "", "Десет", "Двадесет", "Тридесет", "Четиридесет",
        "Петдесет", "Шейсет", "Седемдесет", "Осемдесет", "Деведесет"
    ];

    if (value < 0) { convert(-value); } else if (value >= 1000) {
        convert(Math.floor(value / 1000));

        if (value < 2000) {
            let tmp = output.replace('Един', '');
            output = tmp;
            output += "Хиляда ";
        } else {
            if ((value % 1000 < 2000 && value % 1000 > 999) || (value % 10000 < 2000 && value % 10000 > 999)) {
                let tmp = output.replace('Един', '');
                output = tmp;
                output += "Една";
            }
            output += " Хиляди ";
        }

        if (value % 1000) {
            if (value % 1000 < 10 || value % 100 == 0) { output += "и "; }

            convert(value % 1000);
        }
    } else if (value >= 100) {
        convert(Math.floor(value / 100));

        if (value > 99 && value < 200) {
            let tmp = output.replace('Един', '');
            output = tmp;
            output += "Сто";
        } else if (value > 399 && value < 1000) { output += "стотин"; } else { output += "ста"; }

        let ducktape = false;

        if (value % 100 < 100) {
            if (value % 100 == 1 || value % 100 == 2 || value % 100 == 3 ||
                value % 100 == 4 || value % 100 == 5 || value % 100 == 6 ||
                value % 100 == 7 || value % 100 == 8 || value % 100 == 9) {
                ducktape = true;

                output += " и ";
            } else if (value % 10 == 0 && value % 100 != 0) {
                ducktape = true;

                output += " и ";
            }
        }

        if (!ducktape) { output += " "; }

        convert(value % 100);
    } else if (value >= 20) {
        output += second[Math.floor(value / 10)];

        if (value > 20) {
            if (value % 10 != 0) { output += " и "; }

            convert(value % 10);
        }
    } else {
        if (value > 10 && value < 20) { output += "и "; }

        output += first[value];
    }

    return;
}

let number = prompt("Enter a number to convert: ");
while (isNaN(number)) {
    console.log("You can only enter numbers!");
    number = prompt("Enter a number to convert: ");
}
number = (number * 1).toFixed(2);

let firstNumber = Math.floor(number);
let difference = (number - firstNumber).toFixed(2);

let secondNumber = Math.floor(difference * 100);

if (secondNumber % 10 == 0 &&
    secondNumber != 10 && secondNumber != 20 && secondNumber != 30 &&
    secondNumber != 40 && secondNumber != 50 && secondNumber != 60 &&
    secondNumber != 70 && secondNumber != 80 && secondNumber != 90) { secondNumber /= 10; } // 10 20 30 ... 

convert(firstNumber);

if (firstNumber == 0) { output += "Нула"; }
if (firstNumber > 10 && firstNumber < 20) {
    let tmp = output.replace('и ', '');
    output = tmp;
}
if (firstNumber % 10 == 2) {
    let tmp = output.substr(0, output.length - 1);
    tmp += "a";
    output = tmp;
}

if (secondNumber > 10 && secondNumber < 20) { output += " лева "; } else { output += " лева и "; }

convert(secondNumber);

if (secondNumber % 10 == 1) {
    let tmp = output.substr(0, output.length - 2);
    tmp += "на";
    output = tmp;
}

if (secondNumber == 1) {
    output += " стотинка";
} else {
    if (secondNumber == 0) { output += "Нула"; }
    output += " стотинки";
}

console.log(number + " : " + output);