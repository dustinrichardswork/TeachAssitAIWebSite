import { useContext } from "react";
import { useEffect } from "react";
import { ChatbotContext } from "../../context/ChatbotContext";

function Answer({ answer }) {



  const { setAnswerForPrint, language } = useContext(ChatbotContext)

  const slideDown = () => {
    // console.log('Here I am to scroll');
    let content = document.getElementById('chat_content');
    // console.log('content: ', content);

    // Get the last child element
    let lastChild = content.lastElementChild;

    // Calculate the height to subtract (last child's height)
    let subtractHeight = lastChild ? lastChild.clientHeight : 0;

    // Scroll down, but subtract the height of the last child
    content.scrollTop = content.scrollHeight - subtractHeight;
  }


  useEffect(() => {
    slideDown();
    setAnswerForPrint(answer);

  }, [answer])

  return (
    <div>
      <div id='chat_content' className='overflow-y-scroll h-[100vh] pr-4 pt-4'>
        {
          answer?.map((el, i) => {
            function wrapLinksWithAnchorTags(text) {
              // Regular expression to match URLs
              const linkRegex = /\(\s*(https:\/\/[^\s)]+)\s*\)/;

              // Replace link strings with <a> tags
              const replacedString = text.replace(linkRegex, (match) => {
                console.log(match)
                let bmatch = match.replace(/[\[\]()]/g, '')
                bmatch = bmatch.replace(' ', '')
                const lang = language.toLowerCase()
                if(lang === 'chinese'){
                  bmatch = bmatch.slice(0, -1)
                }
                return `  ${bmatch}`;
              });

              let newStr = replacedString.replace(/[\[(]http[^\])]+[\])]/g, (match) => {
                let string = match.replace(/[\[\]()]/g, '')
                return string
              })
              
              newStr = newStr.replace(/http:\/\/[^\s]+/g, (match) => {
                return `  <a href='${match}' target='_blank' style={{color: 'blue'}}>${match}</a>`
              })
              newStr = newStr.replace(/https:\/\/[^\s]+/g, (match) => {
                return `  <a href='${match}' target='_blank' style={{color: 'blue'}}>${match}</a>`
              })
              text = newStr.replace(/\n/g, '<br />');

              return text;
            }

            let newText = wrapLinksWithAnchorTags(el?.answer)

            return (
              <div className="chat_content_item prose prose-xl" style={{ width: '100%' }}>
                {
                  el?.question && (
                    <h4 className='mt-20 mb-3 text-xl font-bold'>
                      {el?.question}
                    </h4>
                  )
                }
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: newText }} />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Answer;