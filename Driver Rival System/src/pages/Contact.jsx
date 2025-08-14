import "../css/main.css"
import "../css/Contact.css"

function Contact() {
    return (
        <>
            <div className="content-container-large" style={{ maxWidth: "800px", marginInline: "auto" }}>
                <div className="contact-content">
                    <h1>Contact</h1>
                    <p>Have suggestions or feedback? Send a message and we will get back as quick as possible.</p>
                </div>
                <form className="contact-form">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required></input>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" required></input>
                    <label htmlFor="message">Message</label>
                    <textarea type="textarea" id="message" required></textarea>
                    <button className="button justify-right" type="submit">Submit</button>
                </form>
            </div>

        </>
    );
}

export default Contact;