import React from 'react'
import './UniversityIcons.css'
import uni1 from '../../assets/img/uni-1.png'
import uni2 from '../../assets/img/uni-2.png'
import uni3 from '../../assets/img/uni-3.png'
import uni4 from '../../assets/img/uni-4.png'
import uni5 from '../../assets/img/uni-5.png'

const UniversityIcons = () => {
  return(
    <div className="container uni-icons">
      <h3 className="text-center">Partners</h3>
      <div className="university container fluid">
        
        <img id="uni1" src={ uni1 } alt="uni1"/>
        <img id="uni2" src={ uni2 } alt="uni2"/>
        <img id="uni3" src={ uni3 } alt="uni3"/>
        <img id="uni4" src={ uni4 } alt="uni4"/>
        <img id="uni5" src={ uni5 } alt="uni5"/>

    </div>
    </div>
  );
}

export default UniversityIcons;