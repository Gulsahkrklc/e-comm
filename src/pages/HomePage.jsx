import EditorsPick from "../components/EditorsPick";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";
import PageContent from "../layout/PageContent";

function HomePage() {
    const firstSlides = [
        {
            id: 1,
            title: "SUMMER 2020",
            subtitle: "NEW COLLECTION",
            description:
                "We know how large objects will act, but things on a small scale.",
            buttonText: "SHOP NOW",
            image:
                "/images/slider1.jpg",
        },
        {
            id: 2,
            title: "WINTER SALE",
            subtitle: "HOT DEALS",
            description: "Discover our winter collection with amazing discounts.",
            buttonText: "SHOP NOW",
            image:
                "/images/slider1.jpg",
        },
    ];

    const secondSlides = [
        {
            id: 1,
            title: "SUMMER 2021",
            subtitle: "Vita Classic Product",
            description:
                "We know how large objects will act. We know how are objects will act.",
            buttonText: "ADD TO CARD",
            price: "$16.48",
            image:
                "/images/slider2.jpg",
        },
        {
            id: 2,
            title: "WINTER SALE",
            subtitle: "Vita Classic Product",
            description: "Discover our winter collection with amazing discounts.",
            buttonText: "ADD TO CARD",
            price: "$16.48",
            image:
                "/images/slider2.jpg",
        },
    ];

    return (
        <div>
            <PageContent>
                <Slider slides={firstSlides} />
                <EditorsPick />
                <ProductCard />
                <Slider slides={secondSlides} />
            </PageContent>
        </div>
    )
}

export default HomePage;