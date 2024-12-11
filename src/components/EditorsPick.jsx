import React from "react";

const EditorsPick = () => {
  const categories = [
    { id: 1, title: "MEN", img: "https://s3-alpha-sig.figma.com/img/9da5/ab42/c0357746eb27e42fff6279478e2c8a48?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=q07a0QU3hwnDwBlGs7mpjU02NDpEL9EsayONtNuaGb1ZoQFqXoNy~Fo560tMyRCRdIhdjoNEgYdZpVtd7sFt28vDUa1n1bTBFUAaYgM4K22dXyYQeKF4wFG4iAIleTyJs8ywNNoF4W68Hne9A0oOer-KkVhXV2kHeWBxzmh3zvfyMkn4wL7sbugQ6MorwMWBcaJxyVwRw~MdsPqoegfzerKzyzG04wXOvvdDCZiwOXg3-vIqJoY~SnIDlb4psbtm8jC-XUhKwMN9EGsXNeTyhJqEdi~cOFXuvjYAQQf9VPcprzaw7Y8e~GZEuWRSPrUZXgQuxitaGAnXtogLtX95ow__" },
    { id: 2, title: "WOMEN", img: "https://s3-alpha-sig.figma.com/img/b384/eba6/08bd8616723a95d25fce7dcb8f25ba9d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B5jsthpmJfEKk0b7u0-PoKFBOkG5Y6jMSty7BpIFgG38Q1y9l7iRyIHM7mw9YRVWUnlF8ol2ou9Ea1p657FJzGiTsRbYWHZKqCh4VReKZJL1q7~2AxEBUjUsmOaXlggFHTmaSBx3dPdM3IO-gmsz2OArr~CVTh5sNVQtb7g9J6QuLFVwD~Mn3iMqkD~7yrDRjatUqiYr4ZqxUHSxdh3hgLE4r~WrDSWLReojsg-Ih4nhnv49AWmcmcV680olONcCuQy4jkQd1k7goFeRT5NW~sq2mAnotnZTXNEKPxIuomt1XMTi2KEXWP37L73-0Nvk8tHxpj2rLZtbb6ZI5KTr8g__" },
    { id: 3, title: "ACCESSORIES", img: "https://s3-alpha-sig.figma.com/img/5077/f785/cbfd4a6cf9efad13d9b5d66b1b7cbf4f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oyyMcLQcUKfX-csjPLBvzKh~CV0yFPxVq-rXZGCiB5D8JxtsjLV~6Bp9OZMnPI8xFBcwrhDd13CdGmyOIxipmKRCRxHt-r7S~duY5Mrtnz-thrOAoqmZFrg-UkwGc5i7fnMhSX8TPkeIyRMemtixtEKymXa4~FAxAyOXGJ8osTDDm050k2DpY3k~jQn1YxNSwW2TrHHVAUzPYoteb1Z7FQHWKBNFj1BKGm-6z42sfcVQw7OcrUdKd8TR8I1n-iKrvlYG1nGidFwinJjqFTeKKg4Ii~TnWIwfEFBD1yKD9kGFal9jOK0~fqAaQNqaewXRUo18ZnllAhCrcO6WP9ePEw__" },
    { id: 4, title: "KIDS", img: "https://s3-alpha-sig.figma.com/img/edfc/ad0d/ba1967435dad649ed91c2e00be5f640f?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eCdJtbPJ96FvyuvIuZh0Pwuxk-xtmCcQ2CH-StGQupaFQ9uNy8mnhahrH-J07QQo7oAUVwdVmML2jhwrvTH8SNNA3w2ztj4cbQ6pT9aLs5zPtD4uuXbOWuZgUqwCkGATixxJAR9oydhSYgAZp6p-QkjD8fBWeQgemyxrV3s2y0razvrwW6a2GlQiaENsvYWbEt~62ZmDL7bK7OUVESQhWEJFSA63e-tsMvmtNpP57WhCyElTuum6xuiP~u92SpncCqBq-gLM9BETOJyzE2xPksdNajKS3EaRqEXA2cfS7IEDN66ZBogxdHmltKlpvykgGqETfdQT49Or7BtE-kWTuw__" },
  ];

  return (
    <div className="px-4 py-14 md:px-16 font-monts bg-[#FAFAFA]">
      <div className="text-center mb-8">
        <h2 className="text-[24px] font-bold text-[#252B42] leading-8">
          EDITOR'S PICK
        </h2>
        <p className="text-[14px] font-normal text-[#737373] leading-5">
          Problems trying to resolve the conflict between
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        <div className="row-span-2 relative group overflow-hidden max-h-[450px]">
          <img
            src={categories[0].img}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <button className="absolute bottom-4 left-4 bg-white text-[#252B42] font-bold text-[16px] leading-6 px-14 py-2 shadow-md group-hover:bg-[#252B42] group-hover:text-white transition-colors duration-300">
            {categories[0].title}
          </button>
        </div>
        <div className="row-span-2 relative group overflow-hidden max-h-[450px]">
          <img
            src={categories[1].img}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <button className="absolute bottom-4 left-4 bg-white text-[#252B42] font-bold text-[16px] leading-6 px-10 py-2 shadow-md group-hover:bg-[#252B42] group-hover:text-white transition-colors duration-300">
            {categories[1].title}
          </button>
        </div>
        {categories.slice(2, 4).map((category) => (
          <div key={category.id} className="relative group overflow-hidden max-h-[217px]">
            <img
              src={category.img}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <button className="absolute bottom-4 left-4 bg-white text-[#252B42] font-bold text-[16px] leading-6 px-6 py-2 shadow-md group-hover:bg-[#252B42] group-hover:text-white transition-colors duration-300">
              {category.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorsPick;