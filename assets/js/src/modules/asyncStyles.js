export const asyncStyles = () => {

    const createLink = (url)=>{
        let elem = document.createElement('link');
    elem.rel = 'stylesheet';
    elem.href = url
    document.head.appendChild(elem);
    }
    
    createLink('assets/css/reviews.css')
    createLink('assets/css/modal.css')
    createLink('assets/css/footer.css')
    createLink('https:/fonts.googleapis.com/css2?family=Raleway:wght@500;600;700&display=swap')





    
}