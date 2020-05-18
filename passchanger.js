const Nightmare = require("nightmare");
const _ = require("lodash");

export const passchanger = (id, oldpass, newpass) => {
  const nightmare = Nightmare();
  return new Promise((resolve, reject) => {
    nightmare
      .goto("https://kvispwchange.pttgrp.com/Default.aspx")
      .insert("input#KVIS\\\\Username")
      .insert("input#KVIS\\\\Username", id)
      .insert("input[id='KVIS\\\\Old Password']")
      .insert("input[id='KVIS\\\\Old Password']", oldpass)
      .insert("input[id='KVIS\\\\New Password']")
      .insert("input[id='KVIS\\\\New Password']", newpass)
      .insert("input[id='KVIS\\\\Confirm Password']")
      .insert("input[id='KVIS\\\\Confirm Password']", newpass)
      .click("input#ChangePasswordButton")
      .wait(2000)
      .evaluate(() => document.querySelectorAll("td")[11].innerHTML)
      .then((any) => {
        resolve(`${id} : ${any}`);
      })
      .catch((e) => {
        resolve(`${id} : nightmare err, ${e}`);
      });
  });
};
