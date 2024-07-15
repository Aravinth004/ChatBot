import React, { useEffect, useRef, useState } from 'react'
import { IoSend, IoTrash, IoMenu } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { BiLike, BiDislike } from "react-icons/bi";
// import { BiDislike } from "react-icons/bi";
// require("dotenv").config()

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBchNPDBj588XFPF0lxsB4NdqT7wVbyxAE")


const Home = () => {
  const textAreaRef = useRef(null);
  const [val, setVal] = useState("");
  const [hide_send, sethide_send ] = useState("none")
  const [ chathistory, setchathistory] = useState([])
  const [hide_content, sethide_content]= useState("unset")
  const [hide_search_result, sethide_search_result] = useState("none")
  const [bot_answer, setbot_answer ] = useState("")
  const [show, setshow]= useState(false)


  const handleChange = (event) => {
    setVal(event.target.value)
    }
  const sendquestion = (event)=>{
    console.log(event.target.value); 
  }
// let x = 0
  useEffect(()=>{
    console.log(chathistory)
    if(bot_answer!=""){
    //   setchathistory( [...chathistory,{
    //     role:"user",
    //     parts: [{ text: val }],
    //   },{
    //     role:"model",
    //     parts: [{ text: bot_answer }],
    //   },
    // ])
    console.log("123");
  setVal("")
    }
  },[bot_answer])
  
  useEffect(()=>{
    if(chathistory.length > 0){
      sethide_content("none")
      sethide_search_result("unset")

    }else{
      sethide_content("unset")
      sethide_search_result("none")
    }
    console.log("chatHistory",chathistory);
    // console.log(chathistory[1]?.parts[0]?.text);
  },[chathistory,bot_answer])
  
  useEffect(() => {
    textAreaRef.current.style.height = "45px"
    if(val!=""){
      sethide_send("unset")
    }else{
      sethide_send("none")
    }
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"

  }, [val])
  const copytext = (copyText,x) =>{
    let msg = document.getElementsByClassName("copy_icon")[x].style
    navigator.clipboard.writeText(copyText);
    msg.color = 'black'
    msg.filter = "drop-shadow(1px 1px 1px gold)"
    msg.transform = "scale(1.2,1.2)"
    setTimeout(() => {
      msg.color = "white"
      msg.filter = "none"
      msg.transform = "scale(1,1)"
    }, 500);
  }
  const likebtn = (x)=>{
    let like = document.getElementsByClassName("like_icon")[x].style
    let dislike = document.getElementsByClassName("dislike_icon")[x].style
    like.color = "black"
    like.filter = "drop-shadow(1px 1px 1px gold)"
    like.transform = "scale(1.2,1.2)"
    dislike.color = "white"
    dislike.filter = "none"
    dislike.transform = "scale(1,1)"

  }
  const dislikebtn = (x)=>{
    let like = document.getElementsByClassName("like_icon")[x].style
    let dislike = document.getElementsByClassName("dislike_icon")[x].style
    dislike.color = "black"
    dislike.filter = "drop-shadow(1px 1px 1px gold)"
    dislike.transform = "scale(1.2,1.2)"
    like.color = "white"
    like.filter = "none"
    like.transform = "scale(1,1)"

  }

  const getresponse = async () =>{
    try{
      console.log("in");
      console.log(chathistory);
      // console.log(val);

      // -----------------------------
      async function run() {
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      
        const chat = model.startChat({
          history: chathistory
          
        });
      
        const msg = val;
      
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        console.log(text,"wos");
        setbot_answer(text)
        console.log(chathistory);
      }
      
      run();
      // -------------------------------

      // const options = {
      //   method : "POST",
      //   body : JSON.stringify({
      //     history : chathistory,
      //     message : val
      //   }),
      //   headers: { "content-type": "application/json" },
      // }
      // const response = await fetch('http://localhost:8000/gemini', options)
      
      // response.text().then((res)=> {setbot_answer(res)}).then().catch((error)=>{console.log(error);})

    }catch{

    }
  }

  return (
    <>
    <div className='container'>
      <section className={'history ' + (show ? "show_history":"hide_history")}>
        <h1>History</h1>
        <hr className='hr'/>
        <div className='clr_history'>
          <button onClick={()=> setchathistory([])}>Clear History <IoTrash className='icon'/></button>
        </div><br />

        <div className='user_history'>
          {
            chathistory?.map((values,index)=>{
              
              return(
                <>
                <div key={index} className={"user_question"}>
                  <p className={(values?.role == "user"? "question_seek":"hide")} onClick={()=>setVal(values?.parts[0].text)} >{values?.parts[0].text}</p> 
                </div>
                </>
              )
            })

          }
        </div>

      </section>

      <main className='main'>

        <header>
        <span className='hamburgar' onClick={()=>{setshow(!show)}} ><IoMenu /></span>
        <p className='tittle'>ChatBot</p>
        <span className='logo'><img src="../ast_logo.jpg" alt="Logo" /> </span>
        </header>

        <div className='content' style={{display:hide_content}}>
          <div>
            <p>Hello,</p>
            <p>How can I help you today?</p>
          </div><br />
          <div className='pre_questions'>

            <div className='box'>
              <p className='question' onClick={()=>{setVal(document.getElementsByClassName('question')[0].innerText)}} >
                Tell me a Joke
              </p>
              
            </div>
            <div className='box'>
              <p className='question' onClick={()=>{setVal(document.getElementsByClassName('question')[1].innerText)}} >
               Ask me a Riddle !
              </p>
              
            </div>
            <div className='box'>
              <p className='question' onClick={()=>{setVal(document.getElementsByClassName('question')[2].innerText)}}>
              Tell me a fun fact !

              </p>
              
            </div>
            <div className='box'>
              <p className='question' onClick={()=>{setVal(document.getElementsByClassName('question')[3].innerText)}} >
              Can you test my knowledge on ancient civilizations by asking me questions ?

              </p>
              
            </div>

          </div>
        </div>

        <div className='search_result_pre'>
        <div className='search_result' style={{display:hide_search_result}}>
          {
            chathistory?.map((values,index)=>{
              // {console.log(values.parts[0].text)} chathistory[1].parts[0].text
              return(
                <>
                <div key={index} className={'answer_box '+(values?.role == "user"? "answer_end":"answer_start")}>
                  
                <p className={'answer '+(values?.role == "user"? "answer_r":"answer_l")}>{values?.parts[0].text}
                  <div className={(values?.role == "user"? "hide":"seek")}>
                    <span className='hover_traget ' onClick={()=>copytext(values?.parts[0].text,index)} ><FaRegCopy className='copy_icon' /><span class="hover_message">Copy</span></span> 
                    <span className='hover_traget ' onClick={()=>likebtn(index)}><BiLike className='like_icon' /><span class="hover_message">Like</span></span> 
                    <span className='hover_traget ' onClick={()=>dislikebtn(index)}><BiDislike className='dislike_icon' /><span class="hover_message">Dislike</span></span>
                  </div>
                </p> 
                </div> 
                </>
              )
            })
          }

          {/* <div className='answer_box'>
            <p className='answer'>
              <span>bot/user :</span>
                hello
            </p>
            <div><span>copy</span><span>like</span><span>dislike</span></div>
          </div> */}

        </div>
        </div>

        <footer>
          
          <textarea name="prompt" id="IP" value={val} rows="1" ref={textAreaRef} onChange={handleChange} placeholder='Enter your prompt here' > </textarea>
          <IoSend id='send' style={{display:hide_send}} role='button' onClick={getresponse} />
          
          <p>ChatBot by Aravinth</p>
        </footer>

      </main>
    </div>
    </>
  )
}

export default Home
