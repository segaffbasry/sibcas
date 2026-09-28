import { Label, Pill } from "@/components/ui";
import { contact, contactHref } from "@/lib/site";

/* MeiLog's contact block: statement and details on the left, a ruled list on the right where MeiLog has
   its form. SiBCAS' enquiries stay on their own contact page, so the rows link there instead of posting. */
export default function Contact() {
  return <section className="contact wrap" id="contact" aria-labelledby="contact-title">
    <div className="contact-lead">
      <Label>Contact</Label>
      <h2 className="h2" id="contact-title" data-rise>Get in Touch<span className="muted">.</span></h2>
      <p className="contact-copy" data-rise>What ever type of project, we can cater for your Modular Building and Site Accommodation needs.</p>
      <address className="contact-office" data-rise>
        <strong>Head Office</strong>
        {contact.company}<br />{contact.address.join(", ")}
      </address>
    </div>
    <div className="contact-rows">
      <a href={contact.phoneHref} className="contact-row" data-rise><span className="mono">Telephone</span><strong>{contact.phone}</strong></a>
      <a href={`mailto:${contact.email}`} className="contact-row" data-rise><span className="mono">E-mail</span><strong>{contact.email}</strong></a>
      <a href="https://sibcas.co.uk/used-sales-contact/" className="contact-row" data-rise><span className="mono">Used sales</span><strong>Buildings for sale enquiries</strong></a>
      <a href="https://sibcas.co.uk/careers/" className="contact-row" data-rise><span className="mono">Careers</span><strong>Join the SiBCAS team</strong></a>
      <div className="contact-foot" data-rise>
        <span className="mono">{contact.registered}</span>
        <Pill href={contactHref} tone="dark" external>Contact Us</Pill>
      </div>
    </div>
  </section>;
}
