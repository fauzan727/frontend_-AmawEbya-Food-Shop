

function Footer(){
    return (
        <footer className="bg-white border-t border-border">
            <section className="py-8">
                <div className="flex gap-[32px] justify-center">
                    <a href="#" className="text-primary font-normal hover:text-hover-link transition-colors">About us</a>
                    <a href="#" className="text-primary font-normal hover:text-hover-link transition-colors">Contact</a>
                    <a href="#" className="text-primary font-normal hover:text-hover-link transition-colors">term of Service</a>
                    <a href="#" className="text-primary font-normal hover:text-hover-link transition-colors">Privacy Policy</a>
                </div>
            </section>
            <section className="py-8">
                <div className="flex gap-[20px] justify-center">
                    <a href="#" className="text-primary font-normal hover:text-hover-link transition-colors"><i className="fa-brands fa-facebook-f" /></a>
                    <a href="#" className="text-primary font-normal hover:text-hover-link transition-colors"><i className="fa-brands fa-instagram" /></a>
                    <a href="#" className="text-primary font-normal hover:text-hover-link transition-colors"><i className="fa-brands fa-x-twitter" /></a>
                </div>
            </section>
            <section className="copyrights py-4 text-center text-primary text-sm">
                © 2026 Food Shop. All rights reserved.
            </section>
        </footer>
    )
}

export default Footer