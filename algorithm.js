
class box{
  constructor(){
    this.allRod=[];
    this.len=0;
    this.source = [],this.aux=[],this.des=[];
    this.colors = ["#ADD8E6","#C0C0C0","#FFA500","#A52A2A","#008000","#808000","#FF00FF","#ADD8E6","#00FFFF","#FF0000"];
  }
};
let obj = new box;
//alert(obj.colors)
let start = () =>{
   clr();
   let input = parseInt(document.getElementById('input').value);
   let motion = parseInt(document.getElementById('motion').value);
   //Insert 1 to input number of Disks to source array
   if(input > 0 && motion > 0){
   for(let i=1;i<=input;i++){
       obj.source.push(i);
   }
   obj.len = input;
   startAlgo(input,motion);
}
}
//Start TOH using Recursion
let startAlgo = (input,motion) =>{
     towerOfHanoi(input,'A','B','C');//A - source bar, B - Auxilary bar, C - Destination
     updateDisplay(input);
     makeTheMove(motion,input);
}
let towerOfHanoi = (input,sour,aux,des) =>{
    if(input == 0) return;
    towerOfHanoi(input-1,sour,des,aux);
    obj.allRod.push(sour+'-'+des);  // Push the move for further track
    towerOfHanoi(input-1,aux,sour,des);
}
let size = 0;
let makeTheMove = (motion,input) =>{
    setTimeout(()=>{
       if(size<obj.allRod.length-1){
           makeTheMove(motion);
       }
       let valSplit  = obj.allRod[size].split('-');
       let bar="";
       valSplit[0]=='A'?bar=obj.source.shift():valSplit[0]=='B'?bar = obj.aux.shift():bar=obj.des.shift(); //work like queue
       valSplit[1]=='A'?obj.source.unshift(bar):valSplit[1]=='B'?obj.aux.unshift(bar):obj.des.unshift(bar);
       updateDisplay();
       size++;
    },motion);
}

let updateDisplay = () =>{
    //update and append child in the three bar
    let aObj = document.getElementById('A');
    let bObj = document.getElementById('B');
    let cObj = document.getElementById('C');
    aObj.innerText="";
    bObj.innerText="";
    cObj.innerText="";
    //For Bar Source
    let input = obj.len;
    updateSourceBar(aObj,input);
    updateAuxBar(bObj,input);
    updateDesBar(cObj,input);
}
let updateSourceBar = (aObj,input) =>{ //Make new Div with some style things!!
    for(let i=0;i<obj.source.length;i++){ 
        let newDiv = document.createElement('div');
        newDiv.style.width=((100/input)*(obj.source[i])-3)+'%';
        newDiv.style.backgroundColor=obj.colors[obj.source[i]];
        newDiv.style.height="27px";
        newDiv.innerHTML=obj.source[i];
        aObj.appendChild(newDiv);
    }
}
let updateAuxBar = (bObj,input) =>{
    for(let i=0;i<obj.aux.length;i++){
        let newDiv = document.createElement('div');
        newDiv.style.width=((100/input)*(obj.aux[i])-3)+'%';
        newDiv.style.backgroundColor=obj.colors[obj.aux[i]];
        newDiv.innerHTML=obj.aux[i];
        newDiv.style.height="27px";
        bObj.appendChild(newDiv);
    }
}
let updateDesBar = (cObj,input) =>{
    for(let i=0;i<obj.des.length;i++){
        let newDiv = document.createElement('div');
        newDiv.style.width=((100/input)*(obj.des[i])-3)+'%';
        newDiv.style.backgroundColor=obj.colors[obj.des[i]];
        newDiv.innerHTML=obj.des[i];
        newDiv.style.height="27px";
        cObj.appendChild(newDiv);
    }
}

//Clear All
let clr = () =>{
    obj.allRod=[];
    obj.len=0;
    obj.source = [],obj.aux=[],obj.des=[];
    size=0;
    updateDisplay();
}