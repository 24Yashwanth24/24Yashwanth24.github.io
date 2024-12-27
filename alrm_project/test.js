let cnt=0;
let state = "woke";
// Create a custom element for the alarm clock
class AlarmClock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
    }
    
    render() {
      const shadowRoot = this.shadowRoot;
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          /* Global Styles */
          * {
            box-sizing: border-box;
            font-size: xx-small;
          }
          /* Toggle Button Styles */
          .toggle_button {
            width: 20px;
            background-color: slategrey;
            height: 10px;
            border-radius: 10px;
            padding: 1.5px;
          }
          /* Circle Toggler Styles */
          .circle_toggler {
            border-radius: 50%;
            background-color: white;
            width: 7px;
            height: 7px;
            padding: 1px;
          }
          /* Small Circle Styles */
          .small_circle {
            width: 5px;
            height: 5px;
            background-color: slategrey;
            border-radius: 50%;
          }
          /* New Styles */
          .new {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: black;
            color: whitesmoke;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 6px;
          }
          /* Input Styles */
          input[type="time"] {
            outline: none;
          }
          /* New Set Styles */
          .new_set {
            width: 40vw;
            height: 40px;
            display: flex;
            border: 1px brown solid;
            align-items: center;
            justify-content: space-evenly;
            background-color: azure;
            flex-wrap:wrap;
            flex-shrink:50;
          }
          /* Body Styles */
          body {
            background-color: rgb(0, 0, 0, 0.80);
          }
          /* Wake Up Styles */
          .wake_up {
            background-color: chocolate;
            visibility: hidden;
          }
          /* Snooze Styles */
          .snooze {
            background-color: cornflowerblue;
            visibility: hidden;
          }
          /* delete alarm option*/
          .close{
            height:15px;
            width:15px;
            border-radius:50%;
            display:flex;
            justify-content:center;
            align-items:center;
            color:blue;
            font:cursive;
          }
        </style>
        <div class="new_set">
          <label for="alarm_time" style="color:crimson ;" class="display_text">Set Alarm</label>
          <input type="time" name="alarm_time" class="time_setter">
          <div type="checkbox" checked class="toggle_button">
            <div class="circle_toggler">
              <div class="small_circle"></div>
            </div>
          </div>
          <button class="wake_up"><i>Turn OFF</i></button>
          <button class="snooze">Snooze for 5 min</button>
          <audio src="alarm_clock.mp3" class="sounder"></audio>
                       <button class="close">
                       <p>X</p>
                       </button>
        </div>
        <br/>
      `;
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  
    connectedCallback() {
      const slider = this.shadowRoot.querySelector('.circle_toggler');
      const track = this.shadowRoot.querySelector('.toggle_button');
      const dot = this.shadowRoot.querySelector('.small_circle');
      const timeinp = this.shadowRoot.querySelector('.time_setter');
      const shw_txt = this.shadowRoot.querySelector('.display_text');
      const snzbtn = this.shadowRoot.querySelector('.snooze');
      const wakebtn = this.shadowRoot.querySelector('.wake_up');
      const music = this.shadowRoot.querySelector('.sounder');
      const closeCircle = this.shadowRoot.querySelector('.close');
// when can the toggle button can on or off
        track.addEventListener("click",()=>{
         if(timeinp.value!==""){
           if(track.style.backgroundColor==="red"){
                       track.style.backgroundColor="slategrey";
                       slider.style.backgroundColor="white";
                  slider.style.transform="translateX(0px)";
                     dot.style.backgroundColor="slategrey";
                  }
               else{
                   slider.style.transform="translateX(10px)";
        track.style.backgroundColor="red";
        dot.style.backgroundColor="white";
               }
            }
   });

   //Getting Current Time and Making a Clock
   const dispTime = document.querySelector(".show_time");
   function clock(){
    let d = new Date();
    //formats hours,minutes&seconds
    dispTime.textContent = String(d.getHours()).padStart(2,"0") +":"+ String(d.getMinutes()).padStart(2,"0") +
    ":"+String(d.getSeconds()).padStart(2,"0");
   };
    setInterval(clock,1000);

    //function to check the time is reached to endPoint or not
    function check_TimeReach(){
      let de = new Date();
      let tn = parseInt(de.getHours()+""+de.getMinutes());
      let tm = timeinp.value.slice(0,2)+timeinp.value.slice(3,5);
      tm = parseInt(tm);
if(track.style.backgroundColor==="red")
  {
        shw_txt.textContent="Alarm has been set";
           wakebtn.style.visibility="hidden";      
           snzbtn.style.visibility="hidden";
           track.style.visibility="visible";
               if(tm===tn)
                {    
                    state = "notWoke";
                    playSound(music);   
                    shw_txt.textContent="Alarm ringing for Time set";
                }
               if(!music.paused&&shw_txt.textContent==="Alarm ringing for Time set")
                {
                    wakebtn.style.visibility="visible";      
                    snzbtn.style.visibility="visible"; 
                    track.style.visibility="hidden";  
                }
                if(state==="notWoke"){
                  playSound(music);   
                  shw_txt.textContent="Alarm ringing for Time set";
                  wakebtn.style.visibility="visible";      
                    snzbtn.style.visibility="visible"; 
                    track.style.visibility="hidden";
                }
   }
   else
   {
      state = "woke";
      shw_txt.textContent="Set Alarm";
      track.style.visibility="visible";
      wakebtn.style.visibility="hidden";      
      snzbtn.style.visibility="hidden";
   }
    };
    setInterval(check_TimeReach,1000);
   
   
    // making a play sound function 
   function playSound(sound){
      sound.play();
   }
   // making a sound off function
   function soundOff(sound){
      sound.pause();
   }
   
   
    //function to Snooze Time
   function snooze_time(TIME){
    let new_time_hrs = TIME.slice(0,2); 
    let new_time_min = TIME.slice(3,5); 
    let new_time = parseInt(new_time_hrs*60) + parseInt(new_time_min);
     new_time +=5;
     new_time_hrs = Math.floor(new_time/60);
     new_time_min = new_time - parseInt(new_time_hrs*60);
    return String(new_time_hrs).padStart(2,"0")+":"+String(new_time_min).padStart(2,"0");
   };
   
   
   snzbtn.addEventListener("click",()=>
    {
      state = "woke";
      soundOff(music);
      timeinp.value = snooze_time(timeinp.value);
      shw_txt.textContent="Alarm Snoozed for 5 Minutes";
    });
    //function when woke up
   wakebtn.addEventListener("click",()=>
    {
          state = "woke";
          soundOff(music);
           shw_txt.textContent="Congrats You Woken to your Alarm";
           track.style.backgroundColor="slategrey";
           slider.style.backgroundColor="white";
          slider.style.transform="translateX(0px)";
          dot.style.backgroundColor="slategrey";
           wakebtn.style.visibility="hidden";      
         snzbtn.style.visibility="hidden";
         timeinp.value="";
   });
//deleting the alarm object 
   closeCircle.addEventListener("click",()=>{
       state = "woke";
       this.remove();
       soundOff(music);
   });

}
}
  // Define the custom element
  customElements.define('alarm-clock', AlarmClock);


  //Getting Current Time and Making a Clock
const dispTime = document.querySelector(".show_time");
function clock(){
 let d = new Date();
 //formats hours,minutes&seconds
 dispTime.textContent = String(d.getHours()).padStart(2,"0") +":"+ String(d.getMinutes()).padStart(2,"0") +
 ":"+String(d.getSeconds()).padStart(2,"0");
};
 setInterval(clock,1000);

//alarm instances counter function
 function count_element(){
  cnt+=1;
}

//id giver to alarm instances function 
function give_id(node_el){
  node_el.setAttribute('id','a'+cnt)
}

 //adding new alarm with plus icon
 const addBtn = document.querySelector('.new');
 let wherePlace = document.getElementById("linked_list");

 addBtn.addEventListener("click",()=>{
 let el =  document.createElement("alarm-clock");
  wherePlace.append(el);
  count_element();
  give_id(el);
});

//make list good looking 
function good_look(){
  if(wherePlace.innerHTML===""){
    wherePlace.style.visibility="hidden";
  }
  else{
    wherePlace.style.visibility="visible";
  }
}
setInterval(good_look,10);