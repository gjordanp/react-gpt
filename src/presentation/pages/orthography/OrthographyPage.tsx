
import { useState } from 'react'
import { GptMessages, MyMessage, TextMessageBox, TextMessageBoxSelect, TypingLoader } from '../../components'
import { TextMessageBoxFile } from '../../components/chat-input-boxes/TextMessageBoxFile';

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }])

    //TODO: UseCase

    setIsLoading(false);

    //TODO: Añadir el mensaje de isGpt en true
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12 gap-y-2'>
          {/* Bienvenida*/}
          <GptMessages text="Hola, puedes escribir tu texto en español y te ayudo con las correcciones" />

          {
            messages.map((message, index) => (
              message.isGpt
                ? (
                  <GptMessages key={index} text="Esto es de OpenAI" />
                )
                : (
                  <MyMessage key={index} text={message.text} />
                )
            ))
          }


          {
            isLoading && (
              <div className='col-start-1 col-end-12 fade-in'>
                <TypingLoader />
              </div>
            )
          }





        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que desees'
        disableCorrections
      />
      {/* <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder='Escribe aqui lo que desees'
      /> */}

      {/* <TextMessageBoxSelect
        onSendMessage={console.log}
        options={[{id: '1', text: 'Opción 1'}, {id: '2', text: 'Opción 2'}]}
      /> */}

    </div>
  )
}
