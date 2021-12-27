import './App.css'
import {useState} from 'react'


function App() {

  const [atUnits, setAtUnits] = useState(0)
  const [defUnits, setDefUnits] = useState(0)

  const [finalStatus, setFinalStatus] = useState('')

  const [finalAtUn, setFinalAtUn] = useState(0)
  const [finalDefUn, setFinalDefUn] = useState(0)

  const [simulating, setSimulating] = useState(false)

  const simulate = () => {
    if(atUnits !== 0 && defUnits !== 0 && Number.isInteger(atUnits) && Number.isInteger(defUnits)) {
      console.clear()
      setFinalAtUn(0)
      setFinalDefUn(0)
      setSimulating(true)

      let currAt = atUnits
      let currDef = defUnits
      while(currAt !== 0 && currDef !== 0) {
        var batAt, batDef, iniAt, iniDef

        if(currAt > 3)
          batAt = 3
        else 
          batAt = currAt

        if(currDef > 2)
          batDef = 2
        else
          batDef = currDef

          
        iniAt = batAt
        iniDef = batDef

        while (batDef !== 0 && batAt !== 0) {
          let diceAtt = []
          let diceDef = []

          for(let i = 0; i < batAt; i++) {
            let ran = Math.floor(Math.random() * 6) + 1;
            diceAtt.push(ran)
          }
          for(let i = 0; i < batDef; i++) {
            let ran = Math.floor(Math.random() * 6) + 1;
            diceDef.push(ran)
          }

          diceAtt.sort(function(a, b) {
            return a - b;
          });
          diceDef.sort(function(a, b) {
            return a - b;
          });

          diceAtt.reverse()
          diceDef.reverse()

          console.log("Dice Defender:")
          console.log(diceDef)
          console.log("Dice Attacker:")
          console.log(diceAtt)

          for(let i = 0; i < batAt; i++) {
            if(i < diceAtt.length && i < diceDef.length) {
              if(diceDef[i] >= diceAtt[i]) 
                batAt = batAt - 1
              
              else 
                batDef = batDef - 1
            }
          }

          console.log("Defender battles:")
          console.log(batDef)
          console.log("Attacker battles:")
          console.log(batAt)

        }
        console.log('battle complete')

        console.log("attack battle stats:")
        console.log("units before battle: " + currAt)

        console.log("initial: " + iniAt)
        console.log("after battle: " + batAt)

        currAt = currAt - (iniAt - batAt)
        console.log("current units: " + currAt)
        console.log()
        console.log("defence battle stats:")
        console.log("units before battle: " + currDef)

        console.log("initial: " + iniDef)
        console.log("after battle: " + batDef)

        currDef = currDef - (iniDef - batDef)
        console.log("current units: " + currDef)

      }

      if(currDef === 0) {
        setFinalStatus("Attacker wins")
        console.log('Attacker Wins')
      }
      if(currAt === 0) {
        setFinalStatus("Defender wins")
        console.log('Defender Wins')
      }

      setFinalAtUn(currAt)
      setFinalDefUn(currDef)

      setSimulating(false)

    }
  }

  const attackHandler = (e) => {
    const val = e.target.value
    if(val === ""){
      setAtUnits(0)
    }
    else {
      const num = parseInt(val)
      if(Number.isInteger(num))
        setAtUnits(num)
    }
  }

  const defenderHandler = (e) => {
    const val = e.target.value
    if(val === ""){
      setAtUnits(0)
    }
    else {
      const num = parseInt(val)
      if(Number.isInteger(num))
        setDefUnits(num)
    }
  }


  return (
    <div 
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{fontColor: '#DFDFDF', fontWeight: 'bold', fontSize: '24px'}}>
        Attacking units:
      </div>
      <input
        onChange={attackHandler}
        value={atUnits}
        style={{
          marginBottom: '50px'
        }}
      />

      <div style={{fontColor: '#DFDFDF', fontWeight: 'bold', fontSize: '24px'}}>
        Defender units:
      </div>
      <input
        onChange={defenderHandler}
        value={defUnits}
        style={{
          marginBottom: '50px'

        }}
      />
      <button onClick={simulate}>simulate</button>


      <div style={{marginBottom: '10px'}}>
        {finalStatus}
      </div>
      { finalStatus !== '' &&
        <div style={{marginBottom: '10px'}}>
          {`Defender: ${finalDefUn}`}
        </div>
      }
      { finalStatus !== '' &&
        <div style={{}}>
          {`Attacking: ${finalAtUn}`}
        </div>
      }

      { simulating &&
        <div style={{position: 'absolute', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'absolute', height: '100%', width: '100%', background: 'black', opacity: 0.6}} />
          <div id="box" />

        </div>
      }
    </div>
  );


}

export default App;
