import {useRef, useState} from 'react'
import emailjs from "@emailjs/browser";

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = ({target: {name, value}}) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await emailjs.send('service_nqr8t6p', 'template_zi55h8r2', {
                from_name: form.name,
                to_name: "Tarjan Bawankule",
                from_email: form.email,
                to_email: "tarjanbawankule1@gmail.com",
            }, 'rXAAplwCF4gmt5EcC')
            setLoading(false);
            alert("Your message has been sent!");

            setForm({
                name: '',
                email: '',
                message: '',
            })
        } catch (error) {
            setLoading(false);
            console.log('something went wrong', error);
        }
    }

    return (
        <section className="c-space my-20" id="contact">
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen"/>
                <div className="contact-container">
                    <h3 className="head-text">Let's Talk</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Whether you are looking to build new website, improve your existing platform, or bring unique project to life I'm here to help.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <div className="flex flex-col gap-3">
                            <label className="space-y-3">
                                <span className="field-label">Full Name</span>
                                <input
                                    type="text"
                                    value={form.name}
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    className="field-input"
                                    onChange={handleChange}
                                />
                            </label><label className="space-y-3">
                                <span className="field-label">Email</span>
                                <input
                                    type="email"
                                    value={form.email}
                                    name="email"
                                    placeholder="johndoe@email.com"
                                    required
                                    className="field-input"
                                    onChange={handleChange}
                                />
                            </label><label className="space-y-3">
                                <span className="field-label">Your Message</span>
                                <textarea
                                    value={form.message}
                                    rows={5}
                                    name="message"
                                    placeholder="Hi, I wanna give you a job..."
                                    required
                                    className="field-input"
                                    onChange={handleChange}
                                />
                            </label>

                            <button className="field-btn" type="submit" disabled={loading}>
                                {
                                    loading
                                        ? "Sending..."
                                        : "Send Message"
                                }
                                <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn-arrow"/>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact
