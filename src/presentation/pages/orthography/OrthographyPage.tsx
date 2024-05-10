
import { useState } from 'react'
import { GptMessages, MyMessage, TextMessageBox, TextMessageBoxSelect, TypingLoader, GptOrthographyMessages } from '../../components'
import { TextMessageBoxFile } from '../../components/chat-input-boxes/TextMessageBoxFile';
import { orthographyUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

export const OrthographyPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }])

    //TODO: UseCase
    const { ok, message, errors, userScore } = await orthographyUseCase(text);


    if (!ok) {
      setMessages((prev) => [...prev, { text: "No se pudo realizar la correccion", isGpt: true }])
    }
    else {
      setMessages((prev) => [...prev, {
        text: message,
        isGpt: true,
        info: {userScore,errors, message}
      }])
    }

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
                  <GptOrthographyMessages
                  key={index}
                  {...message.info!}
                   />
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
