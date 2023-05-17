export const phoneNumberMask = (val: string) => {
  val = val.replace(/ /gm, "");

  let num = `${val[0] === "+" ? val.substring(0, 2) : val.substring(0, 1)} ${
    val[0] === "+" ? val.substring(2, 5) : val.substring(1, 4)
  } ${val[0] === "+" ? val.substring(5, 8) : val.substring(4, 7)} ${
    val[0] === "+" ? val.substring(8, val.length) : val.substring(7, val.length)
  }`;

  num = num.trim();
  return num;
};
