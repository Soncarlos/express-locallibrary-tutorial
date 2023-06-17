/* var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.lastIndexOf(element);
while (idx != -1) {
  indices.push(idx);
  idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
  console.log(idx);
}

console.log(indices);
 [4, 2, 0]*/

/*var timeLimit= function(fn, t){
  return async function(...args){
    return new Promise(async(resolve, reject)=>{
      const timeout= setTimeout(() => reject("Time Limit Exceeded"), t);
      
      try{
        const result= await fn(...args);
        resolve(result);
      }catch(err){
        reject(err);
      }
      clearTimeout(timeout);
    });  
  };
};*/

/* La funcion timeLimit necesita 2 parametros, 1 funcion y un valor que sign. el tiempo de retraso
 crear una funcion para usarla en timeLimit*/
/*const  limitfunc= function(t){return new Promise(res=> setTimeout(res, t), 100)}
const limited = timeLimit(limitfunc);
limited(4000).catch(console.log) // "Time Limit Exceeded" at t=100ms*/

/**
 
 const  limitfunc= ((t) => new Promise(res => setTimeout(res, t)), 100);  
 * const limited = timeLimit(limitfunc);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
// var debounce = function (fn, t) {
//   let timeout;
//   return async function (...args) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fn(...args);
//     }, t);
//   };
// };

// const start = Date.now();
// function log() {
//   console.log(Date.now() - start);
// }
// //const debouncedLog = function(log, 20);

// setTimeout(debounclog, 10); // cancelled
// setTimeout(debounclog, 20); // logs: 40
// setTimeout(debounclog, 50); // cancelled
// setTimeout(debounclog, 60); // logs: 80

// salary = [4000, 3000, 1000, 2000];

// var average = function (salary) {
//   let sum = 0;
//   for (var i = 0; i < salary.length; i++) {
//     sum += salary[i];
//   }
//   return sum / salary.length;
// };
// const ave = average(salary);
// console.log(ave);
// let timeout = null;
// let nextTimeCallFn = null;
// // const delay = Math.max(0, nextTimeCallFn - Date.now());
// // console.log(delay);
// nums = [11,7,15,2];
// target = 9

// var twoSum = function(nums, target) {
//   for(let i = 0; i < nums.length; i++){
//       const comp = target - nums[i];
//       const index = nums.indexOf(comp);

//       if (index !== -1 && index !== i) {
//           return [i, index];
//       }
//   }

//   return [];
// };

// const sum= twoSum(nums, target);
// console.log(sum);

s = "abcabcbb";

// var lengthOfLongestSubstring = function (s) {
//   let arr = s.split("");
//   let result = [];
//   let i = 0;
//   console.log(arr);
//   while (i < arr.length) {
//     const index = arr.lastIndexOf(arr[i]);
//     if (index > 0 && index !== i) {
//       result.push(arr.splice(index, 1));
//       i = 0;
//     } else {
//       i++;
//     }
//   }
//   console.log(arr);
//   return arr.length;
// };

 

st = "pwwkew";
var lengthOfLongestSubstring = function(s) {
  let stack = [];
  let max = 0;

  for (let i = 0; i < s.length; i++) {
      const ind = stack.indexOf(s[i]);
      if (ind >= 0) {
          max = Math.max(max, stack.length);
          stack = stack.slice(ind+1);
      }
      stack.push(s[i]);
  }

  return Math.max(max, stack.length);
};
const str = lengthOfLongestSubstring(s);
 console.log(str);