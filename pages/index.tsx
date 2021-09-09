// Import functions
import { ReactSVGElement, useState, useEffect, SetStateAction, Dispatch } from 'react'
import Gun from 'gun/gun'
import 'gun/sea'
import { isLocalURL } from 'next/dist/next-server/lib/router/router'
import { useMorph } from 'react-morph'
import tinycolor from 'tinycolor2'
import _ from 'lodash'

// Components
import Head from 'next/head'
// import Link from 'next/link'
// import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
// import Date from '../components/date'
import { HexColorPicker } from 'react-colorful'

// Styles
import utilStyles from '../styles/utils.module.css'
import appCDStyles from '../styles/appcd.module.css'
import headerStyles from '../styles/header.module.css'
import letterStyles from '../styles/letter.module.css'
import startCDStyles from '../styles/startcd.module.css'
import jarStyles from '../styles/jar.module.css'
import tabletStyles from '../styles/tablet.module.css'
import friendbookStyles from '../styles/friendbook.module.css'
import writetoolsStyles from '../styles/writetools.module.css'
import messageStyles from '../styles/message.module.css'
import profileStyles from '../styles/profile.module.css'

// Constants
import { MessageForm } from '../constants/message'
// import { DragItemTypes } from '../constants/dragItemTypes'

// Types
import { IGunChainReference } from 'gun/types/chain'

// Images
// import JarIcon from '../public/images/jarIcon.svg'
// import ProfileIcon from '../public/images/ProfileIcon.svg'
// import BookIcon from '../public/images/BookIcon.svg'
// import WriteMessageIcon from '../public/images/WriteMessageIcon.svg'

const navItems = [
  // <svg width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.0614 3.19685C24.0614 1.43128 22.6301 0 20.8645 0H5.13545C3.36988 0 1.9386 1.43128 1.9386 3.19685V5.92763C1.9386 6.18503 2.14726 6.3937 2.40467 6.3937C2.807 6.3937 3.02702 6.87539 2.7835 7.19565C1.04017 9.48833 0 12.3821 0 15.5276C0 22.9682 5.8203 29 13 29C20.1797 29 26 22.9682 26 15.5276C26 12.3821 24.9598 9.48833 23.2165 7.19565C22.973 6.87539 23.193 6.3937 23.5953 6.3937C23.8527 6.3937 24.0614 6.18503 24.0614 5.92763V3.19685Z"/></svg>,
  // <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.42161 17.0476C-1.36061 13.05 1.67981 6.48395 7.17502 6.78226C9.51968 6.90955 11.7286 5.67738 12.8521 3.61551C15.4853 -1.21694 22.6695 -0.354339 24.0839 4.9641C24.6874 7.23334 26.5419 8.9534 28.85 9.38477C34.2597 10.3958 35.6593 17.4949 31.0383 20.4836C29.0666 21.7588 28.0038 24.054 28.3067 26.3825C29.0169 31.8398 22.6977 35.3647 18.4273 31.8933C16.6053 30.4122 14.094 30.1107 11.9731 31.1184C7.00233 33.4801 1.69722 28.5595 3.67905 23.4254C4.52464 21.2349 4.03538 18.7533 2.42161 17.0476Z"/></svg>,
  // <svg width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.0614 3.19685C24.0614 1.43128 22.6301 0 20.8645 0H5.13545C3.36988 0 1.9386 1.43128 1.9386 3.19685V5.92763C1.9386 6.18503 2.14726 6.3937 2.40467 6.3937C2.807 6.3937 3.02702 6.87539 2.7835 7.19565C1.04017 9.48833 0 12.3821 0 15.5276C0 22.9682 5.8203 29 13 29C20.1797 29 26 22.9682 26 15.5276C26 12.3821 24.9598 9.48833 23.2165 7.19565C22.973 6.87539 23.193 6.3937 23.5953 6.3937C23.8527 6.3937 24.0614 6.18503 24.0614 5.92763V3.19685Z" /></svg>,
  // <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.42161 17.0476C-1.36061 13.05 1.67981 6.48395 7.17502 6.78226C9.51968 6.90955 11.7286 5.67738 12.8521 3.61551C15.4853 -1.21694 22.6695 -0.354339 24.0839 4.9641C24.6874 7.23334 26.5419 8.9534 28.85 9.38477C34.2597 10.3958 35.6593 17.4949 31.0383 20.4836C29.0666 21.7588 28.0038 24.054 28.3067 26.3825C29.0169 31.8398 22.6977 35.3647 18.4273 31.8933C16.6053 30.4122 14.094 30.1107 11.9731 31.1184C7.00233 33.4801 1.69722 28.5595 3.67905 23.4254C4.52464 21.2349 4.03538 18.7533 2.42161 17.0476Z"/></svg>
  // (<object type="image/svg+xml" data={JarIcon} />),
  // (<object type="image/svg+xml" data={ProfileIcon} />),
  // (<object type="image/svg+xml" data={BookIcon} />),
  // (<object type="image/svg+xml" data={WriteMessageIcon} />),
  (<svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M26.0614 3.19685C26.0614 1.43128 24.6301 0 22.8645 0H7.13545C5.36988 0 3.9386 1.43128 3.9386 3.19685V5.92763C3.9386 6.18503 4.14726 6.3937 4.40467 6.3937C4.807 6.3937 5.02702 6.87539 4.7835 7.19565C3.04017 9.48833 2 12.3821 2 15.5276C2 22.9682 7.8203 29 15 29C22.1797 29 28 22.9682 28 15.5276C28 12.3821 26.9598 9.48833 25.2165 7.19565C24.973 6.87539 25.193 6.3937 25.5953 6.3937C25.8527 6.3937 26.0614 6.18503 26.0614 5.92763V3.19685Z" fill="#F2F2F2"/></g></svg>),
  (<svg width="15" height="29" viewBox="0 0 15 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#pi_clip0)"><path d="M14.3138 26.5399H2.68606C2.68606 26.5399 0.773584 10.9832 8.49991 10.9832C16.2262 10.9832 14.3138 26.5399 14.3138 26.5399V26.5399Z" fill="white"/><path d="M14.3137 27.0001H2.68628C2.44842 27.0001 2.24775 26.8261 2.21928 26.5945C2.16785 26.1741 0.995046 16.2484 4.64937 12.2136C5.66558 11.0913 6.96099 10.5225 8.49977 10.5225C10.0386 10.5225 11.3344 11.0913 12.3506 12.2136C16.005 16.2484 14.8322 26.1741 14.7807 26.5945C14.7523 26.8261 14.5516 27.0001 14.3137 27.0001ZM3.11105 26.0792H13.889C14.068 24.1785 14.6283 16.1157 11.6467 12.8242C10.805 11.8948 9.77543 11.4434 8.49977 11.4434C7.22411 11.4434 6.19504 11.8948 5.35332 12.8238C2.37173 16.1153 2.93196 24.1785 3.11105 26.0792V26.0792Z" fill="white"/><path d="M8.49991 9.24984C10.9786 9.24984 12.988 7.28222 12.988 4.85503C12.988 2.42783 10.9786 0.460205 8.49991 0.460205C6.02119 0.460205 4.0118 2.42783 4.0118 4.85503C4.0118 7.28222 6.02119 9.24984 8.49991 9.24984Z" fill="white"/><path d="M8.49977 9.71031C5.76615 9.71031 3.54178 7.53218 3.54178 4.85493C3.54178 2.17813 5.76615 0 8.49977 0C11.2339 0 13.4582 2.17813 13.4582 4.85493C13.4582 7.53218 11.2339 9.71031 8.49977 9.71031ZM8.49977 0.920894C6.28459 0.920894 4.48222 2.68579 4.48222 4.85493C4.48222 7.02452 6.28459 8.78941 8.49977 8.78941C10.7154 8.78941 12.5178 7.02452 12.5178 4.85493C12.5178 2.68579 10.7154 0.920894 8.49977 0.920894V0.920894Z" fill="white"/></g><defs><clipPath id="pi_clip0"><rect width="13" height="27" fill="white" transform="translate(2)"/></clipPath></defs></svg>),
  (<svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g><rect x="5" y="3" width="16" height="22" fill="#F2F2F2"/><rect x="21" y="3" width="16" height="22" fill="#F2F2F2"/></g></svg>),
  (<svg width="50" height="29" viewBox="0 0 50 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fillRule="evenodd" clipRule="evenodd" d="M14 4H46V27H2V16L14 4Z" fill="white"/></g><g><path d="M2 16H14V4L2 16Z" fill="white"/></g><g><path fillRule="evenodd" clipRule="evenodd" d="M47.6357 4.54386L45.0393 1.9474L45.0392 1.94737L42.9688 0.123333L42.9687 0.123171L27.2025 15.8894L27.2041 16.1374L27.1875 16.1207L27.2177 19.3513L27.2091 19.3448L27.2091 19.3508L27.2056 19.3482L27.2455 22.331L27.2456 22.3353L27.2456 22.3375L27.2476 22.3375L30.2349 22.3775L30.2259 22.3654L33.4624 22.3956L33.4457 22.379L33.6937 22.3806L33.6937 22.3806L49.4599 6.61442L47.6357 4.54388L47.5126 4.66705L47.5126 4.66704L47.6357 4.54386ZM31.6232 20.5564L31.7464 20.4333L31.7463 20.4332L31.6232 20.5564L31.6232 20.5564Z" fill="white"/></g></svg>)
]

const jarItems = {
  [MessageForm.STAR]: (color = "#E75187") => (<svg width="100%" height="100%" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.8438 4.18511C13.8821 -0.926795 21.1179 -0.926795 23.1562 4.18511C24.0259 6.36621 26.0722 7.85293 28.4153 8.00607C33.9069 8.36498 36.1429 15.2466 31.9111 18.7649C30.1055 20.266 29.3239 22.6716 29.9023 24.9473C31.2579 30.281 25.4041 34.5341 20.7503 31.5966C18.7647 30.3433 16.2353 30.3433 14.2497 31.5966C9.59594 34.5341 3.74206 30.281 5.09771 24.9473C5.67612 22.6716 4.89451 20.266 3.08891 18.7649C-1.14292 15.2466 1.09307 8.36498 6.58466 8.00607C8.92777 7.85293 10.9741 6.36621 11.8438 4.18511Z" fill={color}/>
  </svg>),
  [MessageForm.HEART]: (color = "#C4C4C4") => (<svg width="100%" height="100%" viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.5 34.5C-5 22 -2.00002 -4 9.22175 1.27371C23.5 7.5 12 7.54742 24.5 1.27371C37 -5 39 23 16.5 34.5Z" fill={color}/>
</svg>),
  [MessageForm.CANDY]: (color = "#C4C4C4") => (<svg width="100%" height="100%" viewBox="0 0 56 35" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="28.0441" cy="17.0442" r="10.3423" fill={color}/>
  <path d="M10.9146 17.131C10.9146 12.0772 16.039 8.63677 20.7166 10.5502L30.5884 14.5884C31.5904 14.9983 32.2451 15.9735 32.2451 17.0562V17.0562C32.2452 18.1263 31.6054 19.0928 30.6202 19.5107L20.8016 23.6764C16.1128 25.6657 10.9146 22.2243 10.9146 17.131V17.131Z" fill={color}/>
  <path d="M10.9146 7.50331C10.9146 7.04386 11.3804 6.73109 11.8057 6.90505L31.8435 15.1019C32.0864 15.2012 32.2451 15.4377 32.2451 15.7001V18.3934C32.2451 18.6528 32.09 18.8871 31.8512 18.9884L11.8134 27.4898C11.3871 27.6706 10.9146 27.3577 10.9146 26.8947L10.9146 7.50331Z" fill={color}/>
  <path d="M45.3347 17.131C45.3347 12.0772 40.2102 8.63677 35.5326 10.5502L25.6609 14.5884C24.6588 14.9983 24.0041 15.9735 24.0041 17.0562V17.0562C24.0041 18.1263 24.6439 19.0928 25.629 19.5107L35.4476 23.6764C40.1364 25.6657 45.3347 22.2243 45.3347 17.131V17.131Z" fill={color}/>
  <path d="M45.3347 7.50331C45.3347 7.04386 44.8688 6.73109 44.4436 6.90505L24.4058 15.1019C24.1628 15.2012 24.0041 15.4377 24.0041 15.7001V18.3934C24.0041 18.6528 24.1592 18.8871 24.398 18.9884L44.4359 27.4898C44.8621 27.6706 45.3347 27.3577 45.3347 26.8947L45.3347 7.50331Z" fill={color}/>
</svg>),
  [MessageForm.FLOWER]: (color = "#DB4545", accentColor = tinycolor("#DB4545").lighten(20).toString()) => (<svg width="100%" height="100%" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="15" cy="7" r="7" fill={color}/>
  <circle cx="23" cy="14" r="7" fill={color}/>
  <circle cx="20" cy="23" r="7" fill={color}/>
  <circle cx="10" cy="23" r="7" fill={color}/>
  <circle cx="7" cy="14" r="7" fill={color}/>
  <circle cx="15" cy="16" r="6" fill={accentColor}/>
</svg>)
}

interface Message {
  messageForm: MessageForm,
  messageText: string,
  paperColor: string,
  pencilColor: string
}

interface FormProps {
  name: string,
  fields: FormField[]
}

interface FormField {
  name: string,
  value: string,
  setter: Dispatch<SetStateAction<string>>
}

interface GunUser extends IGunChainReference<Record<string, any>, any, false> {
  is?: boolean | undefined
}

const gun = Gun('https://gunjs.herokuapp.com/gun')
const user: GunUser = gun.user()

// const defaultJarMessages = Promise.allSettled([async () => {
//   const promise = new Promise((resolve, reject) => {
//     let messages = []
//     gun.get('messages').map().once((data, key) => {
//       console.log({key, data})
//       messages.push(data)
//     })
//     resolve(messages)
//   })

//   return await promise.then(result => {
//     return result
//   });
// }])

const defaultFriendlist = [
  { 
    name: 'Marrit Vermaat',
    foto: '/images/profile/pf_Kenrick.jpg',
    info: {
      'Favorite snack': 'Chippies',
    },
  },
  { 
    name: 'Kenrick Halff',
    foto: '/images/profile/pf_Kenrick.jpg',
    info: {
      Birthday: 'November 5th 1993',
      'Favorite snack': 'Frikandel',
      Catchphrase: 'That\'s life',
    },
  },
  { 
    name: 'Jeroen Vermaat',
    foto: '/images/profile/pf_Kenrick.jpg',
    info: {
      'Favorite snack': 'Dat lekkere',
    },
  },
  { 
    name: 'Liliane Snel',
    foto: '/images/profile/pf_Kenrick.jpg',
    info: {
      'Favorite snack': 'Muntdrop',
    },
  }
]

const DropMessageButton = ({ onClick }) => <div className={appCDStyles.dropMessage} onClick={onClick}>&#x21E9;</div>

const Form = ({ fields, name }: FormProps)  => (
  <div>
    {fields.map((field, index) => 
      <input key={name+index} name={field.name} type="text" defaultValue={field.value} onChange={(e) => field.setter(e.currentTarget.value)} />
    )}
  </div>
)

function getClientPos(e: any) {
  return {
    clientX: e.clientX | parseInt(e.changedTouches && e.changedTouches[0].clientX, 10),
    clientY: e.clientY | parseInt(e.changedTouches && e.changedTouches[0].clientY, 10), 
  }
}

function getAngleFromEvent(e: any, setRotation: any) {
  const circle = e.target as HTMLElement
  const circleRect: DOMRect = circle.getBoundingClientRect()
  const circleCenter = {
    x: (circleRect.left + document.body.scrollLeft) + parseFloat(getComputedStyle(circle, null).width.replace('px', '')) / 2,
    y: (circleRect.top + document.body.scrollTop) + parseFloat(getComputedStyle(circle, null).height.replace('px', '')) / 2
  }

  let rotationAngle = Math.atan2(e.pageX - circleCenter.x, - (e.pageY - circleCenter.y)) * (180/Math.PI)
  setRotation(360 % rotationAngle)
}

function stopEventProp(e: any) {
  e.preventDefault()
  e.stopPropagation()
  e.cancelBubble = true
}

function calculateNavRotation(currNavIndex, prevNavIndex, setNavRotation) {
  const indexDistance = currNavIndex - prevNavIndex
  const rndInt = Math.floor(Math.random() * 2)

  let rotationChange = 0
  
  switch (indexDistance) {
    case -3:
      rotationChange = -90
      break;
    case -2:
      rotationChange = rndInt ? 180 : -180
      break;
    case -1:
      rotationChange = 90
      break;
    case 1:
      rotationChange = -90
      break;
    case 2:
      rotationChange = rndInt ? 180 : -180
      break;
    case 3:
      rotationChange = 90
      break;
    default:
      rotationChange = 0
      break;
  }

  setNavRotation(prevRotation => prevRotation + rotationChange)

  return currNavIndex
}

function resetRotationToCurrIndex(currNavIndex, setNavRotation) {
  switch (currNavIndex) {
    case 0:
      setNavRotation(0)
      break;
    case 1:
      setNavRotation(-90)
      break;
    case 2:
      setNavRotation(-180)
      break;
    case 3:
      setNavRotation(90)
      break;
  }
}

function dragStart(e: any, setIsDragging, setDragStartPosition, setDragPosition) {
  const { clientX } = getClientPos(e)

  setIsDragging(true)
  setDragStartPosition(clientX)
  setDragPosition(clientX)
}

function dragEnd(e: any, setIsDragging, setDragStartPosition, setDragPosition) {
  setIsDragging(false)
  setDragStartPosition(0)
  setDragPosition(0)
}

function dragging(e: any, setDragPosition) {
  const { clientX } = getClientPos(e)
  setDragPosition(clientX)
}

// Show drop message button when the message is folded and the section is active
function showDropMessageButton(messageForm: MessageForm, activeNavIndex: number, buttonAtIndex: number): boolean {
  return messageForm !== MessageForm.UNFOLDED && activeNavIndex === buttonAtIndex;
}

function dropMessageInJar(messageForm: MessageForm, messageText: string, paperColor: string, pencilColor: string, setJarItemList, resetMessage): void {
  // Drop message in jar
  // setJarItemList((prev: Set<Message>) => prev.add({messageForm, messageText, paperColor, pencilColor}))
  
  // Save message to jar database
  // const message = gun.get('message').put()
  const messages = user.get('messages')
  messages.set({ messageForm, messageText, paperColor, pencilColor })

  // Show new paper at writingtools
  resetMessage()
}
function dropMessageInFriendpage(resetMessage) {
  // Drop message in jar on Friendpage
  // Send message to Friendpage contact
  // Show new paper at writingtools
  resetMessage()
}

function dropMessageInWritingtools(setMessageForm) {
  // Drop message between writingtools
  // Unfold message
  setMessageForm(MessageForm.UNFOLDED)
}

// console.log(defaultJarMessages);

// Render Pencil
const renderPencil = (pencilColor, showPencilColorPicker, setShowPencilColorPicker) => (
  <svg onClick={() => setShowPencilColorPicker(!showPencilColorPicker)} width="100%" height="100%" viewBox="0 0 30 155" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6.10352e-05" y="1" width="30" height="128" fill="#C4C4C4"/>
    <rect x="9.00006" width="12" height="130" fill="#FF9201"/>
    <path d="M21.0001 0L30.0001 0.999934V129L21.0001 130V0Z" fill="#FEA950"/>
    <path d="M6.10352e-05 1.00005L9.00006 0V130L6.10352e-05 129V1.00005Z" fill="#C3711E"/>
    <path d="M15.0001 155L0.500055 130L29.5001 130L15.0001 155Z" fill="#DEBFAB"/>
    <path d="M15.0001 155L21.0001 130L30.0001 129L15.0001 155Z" fill="#E3C6B4"/>
    <path d="M15 155L2.63372e-05 129L9.00006 130L15 155Z" fill="#BC9574"/>
    <path d="M15 155L8.00006 143.028L11.8828 142.03L18.1133 142.03L22.0001 143.028L15 155Z" fill={pencilColor}/>
    <path d="M14.9999 155L18.11 142.03L22 143.028L14.9999 155Z" fill={tinycolor(pencilColor).lighten(10).toString()}/>
    <path d="M14.9999 155L8 143L11.88 142.03L14.9999 155Z" fill={tinycolor(pencilColor).darken(10).toString()}/>
  </svg>
)


export default function Home() {
  // Nav state
  const [ showNav, setShowNav ] = useState(false)
  const [ activeNavIndex, setActiveNavIndex ] = useState(0)
  const [ navRotation, setNavRotation ] = useState(0)
  
  // Loginscreen state
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ showRegisterForm, setShowRegisterForm ] = useState(false)
  const [ showLoginForm, setShowLoginForm ] = useState(false)
  const [ showLetter, setShowLetter ] = useState(false)

  // Login form state
  const [ loginFormUser, setLoginFormUser ] = useState('')
  const [ loginFormPass, setLoginFormPass ] = useState('')
  
  // Register form state
  const [ registerFormUser, setRegisterFormUser ] = useState('')
  const [ registerFormPass, setRegisterFormPass ] = useState('')

  // Writingtools state
  const [ pencilColor, setPencilColor ] = useState("#2ae6dc")
  const [ paperColor, setPaperColor ] = useState("#1b2f85")
  const [ showPencilColorPicker, setShowPencilColorPicker ] = useState(false)
  const [ showPaperColorPicker, setShowPaperColorPicker ] = useState(false)
  const [ messageText, setMessageText ] = useState("")
  const [ messageForm, setMessageForm ] = useState<MessageForm>(MessageForm.UNFOLDED)
  
  // Message dragging state 
  const [ isDragging, setIsDragging ] = useState(false)
  const [ dragStartPosition, setDragStartPosition ] = useState(0)
  const [ dragPosition, setDragPosition ] = useState(0)
  // Jar state
  
  const [ jarItemList, setJarItemList ] = useState(new Set<Message>())
  const [ hasInitialMessages, setHasInitialMessages] = useState(false)

  // Friendbook state
  const [ friendlist, setFriendlist ] = useState(defaultFriendlist)
  const [ friendbookIndex, setFriendbookIndex ] = useState(0)

  // const messages = gun.get('messages')

  useEffect(() => {
    // if (!hasInitialMessages) {
      // let messages = new Set<Message>()
      if (user.is) {
        user.get('messages').map().on(({messageForm, messageText, paperColor, pencilColor}: Message, key) => {
          const message: Message = { messageForm, messageText, paperColor, pencilColor }
          console.log({key, message, jarItemList})
          // messages.add(message)
          setJarItemList(prev => new Set<Message>(_.uniqWith([...Array.from(prev), message], _.isEqual)))
        }, true)
      }

      // setHasInitialMessages(true)
    // }
      // } else {
    //   gun.get('messages').map().once(({messageForm, messageText, paperColor, pencilColor}: Message, key) => {
    //     const message: Message = { messageForm, messageText, paperColor, pencilColor }
    //     if (jarItemList && !jarItemList.has(message)) {
    //       console.log({key, message, jarItemList})
    //       setJarItemList(prev => new Set<Message>(_.uniqWith(prev.add(message), _.isEqual)))
    //     }
    //   })
    // }
    
  }, [user.is])

  const loginFormProps: FormProps = {
    name: 'loginForm',
    fields: [
      {
        name: 'username',
        value: loginFormUser,
        setter: setLoginFormUser
      },
      {
        name: 'password',
        value: loginFormPass,
        setter: setLoginFormPass
      }
    ]
  }

  const registerFormProps: FormProps = {
    name: 'registerForm',
    fields: [
      {
        name: 'username',
        value: registerFormUser,
        setter: setRegisterFormUser
      },
      {
        name: 'password',
        value: registerFormPass,
        setter: setRegisterFormPass
      }
    ]
  }

  // Drag behaviour for message drag navigation
  let dragDistance = dragPosition ? dragPosition - dragStartPosition : 0;
  if (isDragging && dragDistance > 100) {
    dragDistance = 100;
    setActiveNavIndex(prevNav => calculateNavRotation(prevNav === 3 ? 0 : prevNav + 1, prevNav, setNavRotation))
    setNavRotation(prevRotation => prevRotation - 0.1)
    setDragPosition(0)
    setDragStartPosition(0)
    setIsDragging(false)
  }

  if (isDragging && dragDistance < -100) {
    dragDistance = -100;
    setActiveNavIndex(prevNav => calculateNavRotation(prevNav === 0 ? 3 : prevNav - 1, prevNav, setNavRotation))
    setNavRotation(prevRotation => prevRotation + 0.1)
    setDragPosition(0)
    setDragStartPosition(0)
    setIsDragging(false)
  }

  // Message render logic
  // TODO: Make generic and use for messages in jar and new message
  const renderMessage = () => {
    switch(messageForm) {
      case MessageForm.UNFOLDED:
        return (<>
          <svg width="100%" height="100%" viewBox="0 0 192 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M192 2H22L2 22V102H192V2Z" fill={paperColor}/>
            <g className={writetoolsStyles.dogEar} filter="url(#msg_filter0_d)">
              <path onClick={() => setShowPaperColorPicker(!showPaperColorPicker)} d="M2 22H22V2L2 22Z" fill={paperColor}/>
            </g>
            <defs>
              <filter id="msg_filter0_d" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
            </defs>
          </svg>
          <div className={writetoolsStyles.textareaWrapper}>
            <div className={writetoolsStyles.pullTab} />
            <textarea className={messageSizeClass} style={{color: pencilColor}} onChange={(e) => setMessageText(e.target.value)} value={messageText} />
          </div>
        </>)
        break;
      case MessageForm.STAR:
        return (<div draggable="false" style={{ left: `${isDragging ? dragDistance : 0}px` }} onMouseDown={(e) => dragStart(e, setIsDragging, setDragStartPosition, setDragPosition)} onMouseMove={(e) => isDragging && dragging(e, setDragPosition)} onTouchMove={(e) => isDragging && dragging(e, setDragPosition)} onTouchStart={(e) => dragStart(e, setIsDragging, setDragStartPosition, setDragPosition)} onMouseUp={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)} onTouchEnd={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)}>{jarItems[messageForm](paperColor)}</div>);
        break;
      case MessageForm.HEART:
        return (<div draggable="false" style={{ left: `${isDragging ? dragDistance : 0}px` }} onMouseDown={(e) => dragStart(e, setIsDragging, setDragStartPosition, setDragPosition)} onMouseMove={(e) => isDragging && dragging(e, setDragPosition)} onTouchMove={(e) => isDragging && dragging(e, setDragPosition)} onTouchStart={(e) => dragStart(e, setIsDragging, setDragStartPosition, setDragPosition)} onMouseUp={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)} onTouchEnd={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)}>{jarItems[messageForm](paperColor)}</div>);
        break;
      case MessageForm.CANDY:
        return (<div draggable="false" style={{ left: `${isDragging ? dragDistance : 0}px` }} onMouseDown={(e) => dragStart(e, setIsDragging, setDragStartPosition, setDragPosition)} onMouseMove={(e) => isDragging && dragging(e, setDragPosition)} onTouchMove={(e) => isDragging && dragging(e, setDragPosition)} onTouchStart={(e) => dragStart(e, setIsDragging, setDragStartPosition, setDragPosition)} onMouseUp={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)} onTouchEnd={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)}>{jarItems[messageForm](paperColor)}</div>);
        break;
      case MessageForm.FLOWER:
        return (<div draggable="false" style={{ left: `${isDragging ? dragDistance : 0}px` }} onMouseDown={(e) => dragStart(e, setIsDragging, setDragStartPosition, setDragPosition)} onMouseMove={(e) => isDragging && dragging(e, setDragPosition)} onTouchMove={(e) => isDragging && dragging(e, setDragPosition)} onTouchStart={(e) => dragStart(e, setIsDragging, setDragStartPosition, setDragPosition)} onMouseUp={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)} onTouchEnd={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)}>{jarItems[messageForm](paperColor, pencilColor)}</div>);
        break;
    }
  }

  // Reset the message state
  const resetMessage = () => {
    setMessageForm(MessageForm.UNFOLDED)
    setMessageText("")
  }
  
  // Navigate to CD section
  const goToPage = (pageIndex) => (e: any) => { 
    stopEventProp(e)
    setActiveNavIndex(prevNav => calculateNavRotation(pageIndex, prevNav, setNavRotation))
  }

  // Decide font-size class for message
  let messageSizeClass = 'small'
  if (messageText.split(/\r\n|\r|\n/).length < 3) {
    messageSizeClass = 'large'
  } else if (messageText.split(/\r\n|\r|\n/).length < 5) {
    messageSizeClass = 'medium'
  }

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={`${headerStyles.header}`}>
        <div className={`${utilStyles.button} ${utilStyles.rounded}`}></div>
        <div className={`${utilStyles.quoteIcon} ${utilStyles.button} ${utilStyles.round} ${utilStyles.fillWidth}`}></div>
        <div className={`${utilStyles.button} ${utilStyles.round}`}></div>
      </div>
      { showPencilColorPicker && ( <HexColorPicker color={pencilColor} onChange={setPencilColor}/> ) }
      { showPaperColorPicker && ( <HexColorPicker color={paperColor} onChange={setPaperColor}/> ) }
      {
        user.is ? (
          <>
            {messageForm !== MessageForm.UNFOLDED && <div className={`${writetoolsStyles.message} ${isDragging && writetoolsStyles.messageDragArea} ${writetoolsStyles.folded}`}>
                  {renderMessage()}
            </div>}
            <div
              className={
                `${appCDStyles.cd} 
                ${showNav && appCDStyles.cdActive}
                ${activeNavIndex ? appCDStyles['cdIndex' + activeNavIndex] : appCDStyles.cdIndex1}`
              } 
              style={{transform: `translate(-50%, -50%) rotateZ(${navRotation}deg)`}}
              onClick={(e) => { 
                if (showNav) setShowNav(false)
                if (showPaperColorPicker) setShowPaperColorPicker(false)
                if (showPencilColorPicker) setShowPencilColorPicker(false)
              }}
              onMouseUp={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)} onTouchEnd={(e) => isDragging && dragEnd(e, setIsDragging, setDragStartPosition, setDragPosition)}>
              <div className={appCDStyles.cdBg}>
                <div className={`${appCDStyles.section} ${appCDStyles.section1}`} {...(activeNavIndex !== 0) && {onClick:goToPage(0)}}>
                  <div className={`${jarStyles.jar}`}>
                    {showDropMessageButton(messageForm, activeNavIndex, 0) && <DropMessageButton onClick={() => dropMessageInJar(messageForm, messageText, paperColor, pencilColor, setJarItemList, resetMessage)}/>}
                    <div className={jarStyles.bottom}>
                      <svg width="100%" height="100%" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_biiii)">
                          <circle cx="37" cy="37" r="37" fill="#C4C4C4" fillOpacity="0.109"/>
                        </g>
                        <defs>
                          <filter id="filter0_biiii" x="-12.528" y="-12.528" width="99.056" height="99.056" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImage" stdDeviation="6.264"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape"/>

                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-4.32" dy="4.32"/>
                            <feGaussianBlur stdDeviation="2.16"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.614902 0 0 0 0 0.614902 0 0 0 0 0.614902 0 0 0 0.418 0"/>
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>

                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-2.16" dy="2.16"/>
                            <feGaussianBlur stdDeviation="1.08"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.418 0"/>
                            <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow"/>

                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="4.32" dy="-4.32"/>
                            <feGaussianBlur stdDeviation="2.16"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.418 0"/>
                            <feBlend mode="normal" in2="effect3_innerShadow" result="effect4_innerShadow"/>

                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="2.16" dy="-2.16"/>
                            <feGaussianBlur stdDeviation="1.08"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.614902 0 0 0 0 0.614902 0 0 0 0 0.614902 0 0 0 0.418 0"/>
                            <feBlend mode="normal" in2="effect4_innerShadow" result="effect5_innerShadow"/>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <ul className={jarStyles.itemList}>
                      {
                        Array.from(jarItemList).map((item, index) =>(
                          <li key={`jarItem-${index}`} className={`${jarStyles.item} ${messageStyles[item.messageForm]}`}>
                            {jarItems[item.messageForm](item.paperColor, item.pencilColor)}
                          </li>
                        ))
                      }
                    </ul>
                    <div className={jarStyles.rim}>
                      <svg width="100%" height="100%" viewBox="0 0 227 227" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter1_biiii)">
                          <path fillRule="evenodd" clipRule="evenodd" d="M113.5 227C176.184 227 227 176.184 227 113.5C227 50.8157 176.184 0 113.5 0C50.8157 0 0 50.8157 0 113.5C0 176.184 50.8157 227 113.5 227ZM113 195C157.735 195 194 158.735 194 114C194 69.2649 157.735 33 113 33C68.2649 33 32 69.2649 32 114C32 158.735 68.2649 195 113 195Z" fill="#C4C4C4" fillOpacity="0.109"/>
                        </g>
                        <defs>
                          <filter id="filter1_biiii" x="-12.528" y="-12.528" width="252.056" height="252.056" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImage" stdDeviation="6.264"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur" result="shape"/>

                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-4.32" dy="4.32"/>
                            <feGaussianBlur stdDeviation="2.16"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.614902 0 0 0 0 0.614902 0 0 0 0 0.614902 0 0 0 0.418 0"/>
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow"/>

                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-2.16" dy="2.16"/>
                            <feGaussianBlur stdDeviation="1.08"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.418 0"/>
                            <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow"/>

                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="4.32" dy="-4.32"/>
                            <feGaussianBlur stdDeviation="2.16"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.418 0"/>
                            <feBlend mode="normal" in2="effect3_innerShadow" result="effect4_innerShadow"/>

                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="2.16" dy="-2.16"/>
                            <feGaussianBlur stdDeviation="1.08"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0.614902 0 0 0 0 0.614902 0 0 0 0 0.614902 0 0 0 0.418 0"/>
                            <feBlend mode="normal" in2="effect4_innerShadow" result="effect5_innerShadow"/>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={`${appCDStyles.section} ${appCDStyles.section2}`} {...(activeNavIndex !== 1) && {onClick:goToPage(1)}}>
                  <div className={`${tabletStyles.tablet}`}>
                    <div className={`${tabletStyles.homeButton} ${utilStyles.button} ${utilStyles.round}`} />
                    <div className={profileStyles.userLayout}>
                      <div className={profileStyles.foto} style={{backgroundImage: 'url("/images/profile/pf_Kenrick.jpg")'}}></div>
                      <div className={profileStyles.name}>
                        <input type="text" defaultValue="Kenrick Halff" />
                      </div>
                      <div className={profileStyles.info}>
                        <ul>
                          <li>
                            <label htmlFor="birthday">Birthday</label>
                            <input type="date" name="birthday" id="birthday" />
                          </li>
                          <li>
                            <label htmlFor="favoriteSnack">Favorite snack</label>
                            <input type="text" name="favoriteSnack" id="favoriteSnack" />
                          </li>
                          <li>
                            <label htmlFor="catchphrase">Catchphrase</label>
                            <input type="text" name="catchphrase" id="catchphrase" />
                          </li>                    
                        </ul>
                      </div>
                      <div className={profileStyles.settings}>
                        <ul>
                          <li>
                            <input type="checkbox" name="consentMail" id="consentMail" defaultValue="checked" />
                            <label htmlFor="consentMail">Get the newsletter</label>
                          </li>
                          <li>
                            <input type="checkbox" name="consentData" id="consentData" defaultValue="checked" />
                            <label htmlFor="consentData">Share analytical data</label>
                          </li>
                          <li>
                            <input type="checkbox" name="consentCookies" id="consentCookies" defaultValue="checked" />
                            <label htmlFor="consentCookies">Accept cookies</label>
                          </li>
                        </ul>
                      </div>
                      <div className={profileStyles.stickers}></div>
                    </div>
                  </div>
                </div>
                <div className={`${appCDStyles.section} ${appCDStyles.section3}`} {...(activeNavIndex !== 2) && {onClick:goToPage(2)}}>
                  <div className={`${friendbookStyles.friendbook} ${friendbookIndex === 0 && friendbookStyles.closed}`}>
                    {friendbookIndex === 0 ? (
                      <div onClick={() => setFriendbookIndex(1)}>
                      </div>
                    ) : (
                    <>
                      <div className={`${friendbookStyles.leftpage}`}>
                        {showDropMessageButton(messageForm, activeNavIndex, 2) && <DropMessageButton onClick={() => dropMessageInFriendpage(resetMessage)}/>}
                        <div className={profileStyles.friendLayout}>
                          <div className={profileStyles.foto} style={{backgroundImage: `url(${friendlist[friendbookIndex - 1].foto})`}}></div>
                          <div className={profileStyles.name}>{friendlist[friendbookIndex - 1].name}</div>
                          <div className={profileStyles.info}>
                            <ul>
                            {Object.entries(friendlist[friendbookIndex - 1].info).map(entry => <li key={entry[0]}>{entry[0]}: {entry[1]}</li>)}                 
                            </ul>
                          </div>
                          <div className={friendbookStyles.dogEar} onClick={() => setFriendbookIndex(prev => prev === 1 ? 0 : prev - 2)}></div>
                        </div>
                      </div>
                      <div className={`${friendbookStyles.rightpage}`}>
                        {showDropMessageButton(messageForm, activeNavIndex, 2) && <DropMessageButton onClick={() => dropMessageInFriendpage(resetMessage)}/>}
                        <div className={profileStyles.friendLayout}>
                          <div className={profileStyles.foto} style={{backgroundImage: `url(${friendlist[friendbookIndex].foto})`}}></div>
                          <div className={profileStyles.name}>{friendlist[friendbookIndex].name}</div>
                          <div className={profileStyles.info}>
                            <ul>
                            {Object.entries(friendlist[friendbookIndex].info).map(entry => <li key={entry[0]}>{entry[0]}: {entry[1]}</li>)}                 
                            </ul>
                          </div>
                          {friendbookIndex + 1 < friendlist.length && <div className={friendbookStyles.dogEar} onClick={() => setFriendbookIndex(prev => prev + 2)}></div>}
                        </div>
                      </div>
                    </>)}
                  </div>
                </div>
                <div className={`${appCDStyles.section} ${appCDStyles.section4} ${writetoolsStyles.layout}`} {...(activeNavIndex !== 3) && {onClick:goToPage(3)}}>
                  <ul className={`${writetoolsStyles.shapes}`}>
                      <li onClick={() => setMessageForm(MessageForm.STAR)} className={`${jarStyles.item} ${writetoolsStyles.shape} ${messageStyles.star}`}>
                        {jarItems[MessageForm.STAR](paperColor)}
                      </li>
                      <li onClick={() => setMessageForm(MessageForm.HEART)} className={`${jarStyles.item} ${writetoolsStyles.shape} ${messageStyles.heart}`}>
                        {jarItems[MessageForm.HEART](paperColor)}
                      </li>
                      <li onClick={() => setMessageForm(MessageForm.CANDY)} className={`${jarStyles.item} ${writetoolsStyles.shape} ${messageStyles.candy}`}>
                        {jarItems[MessageForm.CANDY](paperColor)}
                      </li>
                      <li onClick={() => setMessageForm(MessageForm.FLOWER)} className={`${jarStyles.item} ${writetoolsStyles.shape} ${messageStyles.flower}`}>
                        {jarItems[MessageForm.FLOWER](paperColor, pencilColor)}
                      </li>
                    </ul>
                  {messageForm === MessageForm.UNFOLDED ? 
                    <div className={`${writetoolsStyles.message} ${isDragging && writetoolsStyles.messageDragArea}`}>
                      {renderMessage()}
                    </div> 
                    :
                    showDropMessageButton(messageForm, activeNavIndex, 3) && <DropMessageButton onClick={() => dropMessageInWritingtools(setMessageForm)}/>
                  }
                  <div className={`${writetoolsStyles.pencil}`}>
                    {renderPencil(pencilColor, showPencilColorPicker, setShowPencilColorPicker)}
                  </div>
                </div>
              </div>
              <nav 
                className={`${appCDStyles.cdNav} ${appCDStyles['nav-active-'+activeNavIndex]}`}
                onClick={(e) => { setShowNav(true); stopEventProp(e) }}
              >
                {
                  navItems.map((item: ReactSVGElement, i) => {
                    return <div key={"nav-" + (i+1)} {...showNav && {onClick:goToPage(i)}}>{item}</div>
                  })
                }
                </nav>
            </div>
          </>
        ) : (
          <div onClick={e => {
            stopEventProp(e)
            if (showLoginForm) {
              setShowLoginForm(false)
            }
            if (showRegisterForm) {
              setShowRegisterForm(false)
            }
            if (showLetter) {
              setShowLetter(false)
            }
          }} style={{width: '100vw', height: '100vh', position: 'absolute'}}>
            <div onClick={stopEventProp}>
                <div className={
                  `${startCDStyles.startCD} ${appCDStyles.cd}
                  ${(showLoginForm || showRegisterForm) && startCDStyles.showForm }`
                }>
                  <div onClick={_ => setShowLoginForm(true)} className={`${startCDStyles.loginButton}`}>Login</div>
                  {(showLoginForm || showRegisterForm) ? (
                    <div>
                      <Form {...(showLoginForm && loginFormProps || showRegisterForm && registerFormProps)} />
                      <div 
                        onClick={showLoginForm && (_ => user.auth(loginFormUser, loginFormPass)) || showRegisterForm && (_ => user.create(registerFormUser, registerFormPass)) } 
                        className={`${startCDStyles.middleSeparator} ${startCDStyles.submitButton} ${showLoginForm && startCDStyles.loginSubmit} ${showRegisterForm && startCDStyles.registerSubmit}`}>
                          Submit
                      </div>
                    </div>
                  ) :
                    <div className={`${startCDStyles.middleSeparator}`}></div>
                  }
                  <div onClick={_ => setShowRegisterForm(true)} className={`${startCDStyles.registerButton}`}>Register</div>
                </div>
            </div>
            <div onClick={_ => setShowLetter(true)} className={`${letterStyles.letter} ${showLetter && letterStyles.showLetter}`}>
                  <h1>Hello reader</h1>
                  <p>
                    Thank you for visiting this app.
                    I hope you will enjoy it!
                  </p>
                  <p>
                    I want to inform you of how we gather data and for what purpose we will use it.
                  </p>
                  <p>
                    You can visit our Questions and Answers section <a href="#">here</a>
                  </p>
            </div>
          </div>
        )
      }
      
    </Layout>
  )
}
