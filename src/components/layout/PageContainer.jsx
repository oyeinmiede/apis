import './styles/page-container.css'

const PageContainer = ({ children }) => {
    return (
        <section className='page-container'>
            {children}
        </section>
    )
}

export default PageContainer
