'use client';

import { useState, useEffect } from 'react';

interface InputValues {
  finalWeight: number;
  hydration: number;
  inoculation: number;
  salinity: number;
}

interface OutputValues {
  flour: number;
  water: number;
  starter: number;
  salt: number;
}

const BreadCalculator = (): JSX.Element => {
  // Input state
  const [inputs, setInputs] = useState<InputValues>({
    finalWeight: 1000,
    hydration: 70,
    inoculation: 20,
    salinity: 2
  });

  // Output state
  const [outputs, setOutputs] = useState<OutputValues>({
    flour: 0,
    water: 0,
    starter: 0,
    salt: 0
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  // Calculate outputs whenever inputs change
  useEffect(() => {
    // Convert percentages to decimals
    const hydration = inputs.hydration / 100;
    const inoculation = inputs.inoculation / 100;
    const salinity = inputs.salinity / 100;
    
    // Calculation formulas
    // Total weight = flour + water + starter + salt
    // flour is the base (100%)
    // water = flour * hydration
    // starter = flour * inoculation
    // salt = flour * salinity
    
    // Solving for flour:
    // finalWeight = flour + (flour * hydration) + (flour * inoculation) + (flour * salinity)
    // finalWeight = flour * (1 + hydration + inoculation + salinity)
    // flour = finalWeight / (1 + hydration + inoculation + salinity)
    
    const flour = inputs.finalWeight / (1 + hydration + inoculation + salinity);
    const water = flour * hydration;
    const starter = flour * inoculation;
    const salt = flour * salinity;
    
    setOutputs({
      flour: Math.round(flour),
      water: Math.round(water),
      starter: Math.round(starter),
      salt: Math.round(salt)
    });
  }, [inputs]);

  return (
    <div className="min-h-screen py-8">
      <div className="bg-white max-w-md mx-auto rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-amber-800 mb-6 text-center">Bread Calculator</h1>
        
        {/* Input Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-amber-700 mb-4 pb-2 border border-amber-200">Input Values</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="finalWeight" className="block text-sm font-medium text-gray-700 mb-1">
                Final Dough Weight (grams)
              </label>
              <input
                id="finalWeight"
                name="finalWeight"
                type="number"
                value={inputs.finalWeight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="hydration" className="block text-sm font-medium text-gray-700 mb-1">
                Hydration (%)
              </label>
              <input
                id="hydration"
                name="hydration"
                type="number"
                value={inputs.hydration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="inoculation" className="block text-sm font-medium text-gray-700 mb-1">
                Inoculation (%)
              </label>
              <input
                id="inoculation"
                name="inoculation"
                type="number"
                value={inputs.inoculation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="salinity" className="block text-sm font-medium text-gray-700 mb-1">
                Salinity (%)
              </label>
              <input
                id="salinity"
                name="salinity"
                type="number"
                value={inputs.salinity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-amber-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        {/* Output Section */}
        <div>
          <h2 className="text-lg font-semibold text-amber-700 mb-4 pb-2 border border-amber-200">Results</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-amber-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Flour (g)</h3>
              <p className="text-2xl font-bold text-amber-900">{outputs.flour}</p>
            </div>
            
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Water (g)</h3>
              <p className="text-2xl font-bold text-blue-800">{outputs.water}</p>
            </div>
            
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Starter (g)</h3>
              <p className="text-2xl font-bold text-purple-800">{outputs.starter}</p>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Salt (g)</h3>
              <p className="text-2xl font-bold text-gray-800">{outputs.salt}</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Total:</strong> {outputs.flour + outputs.water + outputs.starter + outputs.salt} g
            </p>
          </div>
        </div>
        
        {/* Information Section */}
        <div className="mt-8 text-sm text-gray-600">
          <h3 className="font-medium text-amber-800 mb-2">How to use this calculator:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enter the desired final dough weight in grams</li>
            <li>Set hydration percentage (water relative to flour)</li>
            <li>Set inoculation percentage (starter relative to flour)</li>
            <li>Set salinity percentage (salt relative to flour)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BreadCalculator;