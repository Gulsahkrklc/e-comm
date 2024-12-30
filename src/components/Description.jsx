import React, { useState } from "react";

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/3">
          <div className="relative pb-[100%] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src="/images/detailcard.jpeg"
              alt="Product image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">the quick fox jumps over</h2>
              <p className="text-gray-600">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-gray-600">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-gray-600">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
              <ul className="space-y-2 text-gray-600">
                <li>→ the quick fox jumps over the lazy dog</li>
                <li>→ the quick fox jumps over the lazy dog</li>
                <li>→ the quick fox jumps over the lazy dog</li>
                <li>→ the quick fox jumps over the lazy dog</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">the quick fox jumps over</h3>
              <ul className="space-y-2 text-gray-600">
                <li>→ the quick fox jumps over the lazy dog</li>
                <li>→ the quick fox jumps over the lazy dog</li>
                <li>→ the quick fox jumps over the lazy dog</li>
                <li>→ the quick fox jumps over the lazy dog</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
