

import linkedin from '../Assets/linkedin-logo.png'
const About=()=>{
    return  <div className="about">
    <div className="container">

 <div className="modal-content text-center margin0">
        <div className="modal-header">
          <h4 className="modal-title margin0">
          Reach Me Out At  </h4>

        </div>
        <div className="modal-body">
          <button type="button" className="btn btn-outline-danger mb-2 widthset" onClick={()=>window.open('https://www.linkedin.com/in/nitheesh-s-kumar/')} >
          <img src={linkedin} className="ht20" alt="linkein"/> LinkedIn</button> <br/>

        </div>
      </div>


      <div className="modal-content text-center mt-5 margin0">
        <div className="modal-header">
          <h4 className="modal-title margin0">
            More About{' '}
            <span style={{color:"crimson"}}>Developer</span>
          </h4>
        </div>
        <div className="modal-body">
          <img
            src="https://avatars.githubusercontent.com/u/40543713?s=400&u=772bfe725eda1ae84abd32a22dcb1392c94ac3e5&v=4"
            name="aboutme"
            width="140"
            height="140"
            border="0"
            className="avatar"
            alt="github"
          />
          <h3 className="media-heading">Nitheesh S Kumar</h3>
          <h6>
            <strong>nitheeshskoffice@gmail.com</strong>
          </h6>

          <span className="badge bg-warning p-2 m-1">Angular</span>
          <span className="badge bg-primary p-2 m-1">Vuejs</span>
          <span className="badge bg-secondary p-2 m-1">React</span>
          <span className="badge bg-success p-2 m-1">Github</span>
          <span className="badge bg-danger p-2 m-1">Cloud Architect</span>

        </div>
      </div>
    </div>
  </div>
}

export default About