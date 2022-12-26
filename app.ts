#!/usr/bin/env node
import inquirer from "inquirer";
import figlet from "figlet";
import chalk from "chalk";

async function game() {
  // Generate random number
  let randomNumber = Math.ceil(Math.random() * 10);
  // Number of tries
  let counter = 3;

  do {
    let input = await inquirer.prompt([
      {
        name: "inputNumber",
        type: "number",
        message: "Guess a number between 1 to 10: ",
      },
    ]);

    // Validation and comparison
    if (input.inputNumber > 0 && input.inputNumber < 11) {
      if (randomNumber === input.inputNumber) {
        console.log(
          chalk.greenBright("\nCongratulations! You guessed the right number\n")
        );
        await playAgain();
      } else if (counter == 0) {
        console.log(chalk.redBright(`\nSorry. You lost the game\n`));
        await playAgain();
      } else if (randomNumber > input.inputNumber) {
        console.log(
          chalk.blueBright(
            `Your guess is too low. ${counter} attempts remaining`
          )
        );
        counter--;
      } else if (randomNumber < input.inputNumber) {
        console.log(
          chalk.blueBright(
            `Your guess is too high. ${counter} attempts remaining`
          )
        );
        counter--;
      }
    } else {
      console.log(chalk.redBright("\nYou entered an invalid number\n"));
      await playAgain();
    }
  } while (counter >= 0);
}

async function playAgain() {
  let input = await inquirer.prompt([
    {
      name: "continue",
      type: "confirm",
      message: "Do you want to play again?",
    },
  ]);
  if (input.continue === true) {
    await game();
  } else {
    console.log(chalk.greenBright("\nThank you for playing"));
    process.exit();
  }
}

console.clear();

figlet.text("GUESS THE NUMBER", { font: "Bulbhead" }, (err, data) => {
  if (err) {
    console.log("Something went wrong...");
  }
  console.log(chalk.yellowBright(data), "\n");
  game();
});
