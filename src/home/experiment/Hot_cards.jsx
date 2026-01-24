const products = [
  {
    name: " Tech",
    description: "High Quality classic cap hat with stitch logo",
    images: [
      "https://images.pexels.com/photos/3680904/pexels-photo-3680904.jpeg",
      "https://images.pexels.com/photos/11232505/pexels-photo-11232505.jpeg",
      "https://images.pexels.com/photos/3567218/pexels-photo-3567218.jpeg"
    ]
  },
  {
    name: "Astrology",
    description: "Trendy cap for everyday wear",
    images: [
      "https://images.pexels.com/photos/11960514/pexels-photo-11960514.jpeg",
      "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg",
      "https://images.pexels.com/photos/35223560/pexels-photo-35223560.jpeg"
    ]
  }
];


function ProductCard({ product }) {
  return (
    <div className="card card-sm bg-base-200 w-50 shadow">
      <figure className="hover-gallery h-50">
        <img src={product.images[0]}/>
        {product.images.map((img, index) => (
          <img key={index} src={img} className="w-full h-full object-cover" />
        ))}
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-between">
          {product.name}
          
        </h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
}


export default function Hot_cards() {
  return (
    <div className="flex gap-x-5 flex-wrap">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}