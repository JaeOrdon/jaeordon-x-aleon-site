import { useEffect } from "react";

export default function Newsletter() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div id="mc_embed_shell">
          <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
          <style>{`
            #mc_embed_signup { background: transparent; clear: left; font: 14px Helvetica,Arial,sans-serif; width: 100%; }
            #mc_embed_signup h2 { font-weight: bold; font-size: 2rem; margin-bottom: 2rem; color: black; font-family: 'Playfair Display', serif; }
            #mc_embed_signup .mc-field-group label { color: black; font-weight: bold; }
            #mc_embed_signup .button { background-color: black; color: white; border-radius: 0; height: 50px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; padding: 0 2rem; transition: all 0.3s; }
            #mc_embed_signup .button:hover { background-color: rgba(0,0,0,0.8); }
            #mc_embed_signup input.email { border: 1px solid rgba(0,0,0,0.2); border-radius: 0; padding: 1rem; min-height: 50px; }
          `}</style>
          <div id="mc_embed_signup">
            <form 
              action="https://jaeordon.us16.list-manage.com/subscribe/post?u=f812dfb74125ef26df993e846&amp;id=7c1bf13fee&amp;f_id=00c21ee1f0" 
              method="post" 
              id="mc-embedded-subscribe-form" 
              name="mc-embedded-subscribe-form" 
              className="validate" 
              target="_blank"
            >
              <div id="mc_embed_signup_scroll">
                <h2>Subscribe to get exclusive updates on new tracks, tour dates, and behind-the-scenes.</h2>
                <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                  <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required defaultValue="" />
                </div>
                <div id="mce-responses" className="clear foot">
                  <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                  <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                </div>
                <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                  <input type="text" name="b_f812dfb74125ef26df993e846_7c1bf13fee" tabIndex={-1} defaultValue="" />
                </div>
                <div className="optionalParent">
                  <div className="clear foot flex items-center gap-4">
                    <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
                    <p className="brandingLogo my-0" style={{margin: "0"}}>
                      <a href="http://eepurl.com/i9ZcQw" title="Mailchimp - email marketing made easy and fun">
                        <img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg" alt="Mailchimp" style={{height: "30px", width: "auto"}} />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
