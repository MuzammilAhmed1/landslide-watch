import { MapPin } from 'lucide-react';

export type PermissionState = 
  | 'idle' 
  | 'prompt' 
  | 'requesting' 
  | 'user_denied' 
  | 'browser_denied' 
  | 'unsupported' 
  | 'timeout' 
  | 'outside_ner' 
  | 'success';

interface Props {
  state: PermissionState;
  detectedLocationName?: string;
  onAllow: () => void;
  onDeny: () => void;
  onClose: () => void;
}

export function LocationPermissionModal({ state, detectedLocationName, onAllow, onDeny, onClose }: Props) {
  if (state === 'idle') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F2018]/80 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        
        {state === 'prompt' && (
          <>
            <div className="w-16 h-16 rounded-full bg-[#4A7C59]/10 flex items-center justify-center mb-4">
              <MapPin size={32} className="text-[#4A7C59]" />
            </div>
            <h2 className="text-xl font-black text-[#0F2018] mb-2">Allow Location Access?</h2>
            <p className="text-sm text-slate-600 mb-4">
              Your location helps Landslide Watch identify the nearest monitoring area and provide localized landslide safety information.
            </p>
            <p className="text-xs text-slate-400 mb-6 italic">
              Your location is requested only when you use location-based services.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={onAllow}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#4A7C59] text-white hover:bg-[#3D694A] transition-colors shadow-lg shadow-[#4A7C59]/20"
              >
                Allow Location
              </button>
              <button
                onClick={onDeny}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Deny
              </button>
            </div>
          </>
        )}

        {state === 'requesting' && (
          <>
            <div className="w-16 h-16 rounded-full border-4 border-[#4A7C59]/20 border-t-[#4A7C59] animate-spin mb-4" />
            <h2 className="text-xl font-black text-[#0F2018] mb-2">Detecting your location...</h2>
            <p className="text-sm text-slate-500 mb-6">
              Finding the nearest Landslide Watch monitoring area.
            </p>
          </>
        )}

        {state === 'user_denied' && (
          <>
            <h2 className="text-xl font-black text-[#0F2018] mb-2">Location access denied.</h2>
            <p className="text-sm text-slate-500 mb-6">
              You can continue by selecting a monitoring catchment manually.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#4A7C59] text-white hover:bg-[#3D694A] transition-colors"
            >
              Continue Without Location
            </button>
          </>
        )}

        {state === 'browser_denied' && (
          <>
            <h2 className="text-xl font-black text-[#0F2018] mb-2">Permission Denied</h2>
            <p className="text-sm text-slate-500 mb-6">
              Location permission was denied by your browser.
              <br /><br />
              You can continue by selecting a monitoring catchment manually or enable location access in your browser settings.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={onAllow}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#4A7C59] text-white hover:bg-[#3D694A] transition-colors"
              >
                Continue Without Location
              </button>
            </div>
          </>
        )}

        {state === 'timeout' && (
          <>
            <h2 className="text-xl font-black text-[#0F2018] mb-2">Timeout</h2>
            <p className="text-sm text-slate-500 mb-6">
              Location detection timed out. Please try again.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={onAllow}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#4A7C59] text-white hover:bg-[#3D694A] transition-colors"
              >
                Continue Without Location
              </button>
            </div>
          </>
        )}

        {state === 'unsupported' && (
          <>
            <h2 className="text-xl font-black text-[#0F2018] mb-2">Unsupported</h2>
            <p className="text-sm text-slate-500 mb-6">
              Location services are not supported by this browser.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#4A7C59] text-white hover:bg-[#3D694A] transition-colors"
            >
              Continue Without Location
            </button>
          </>
        )}

        {state === 'outside_ner' && (
          <>
            <h2 className="text-xl font-black text-[#0F2018] mb-2">Location Outside Monitoring Area</h2>
            <p className="text-sm text-slate-500 mb-6">
              Your current location is outside the Landslide Watch Northeast India monitoring area.
              <br /><br />
              Please select a monitoring catchment manually.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#4A7C59] text-white hover:bg-[#3D694A] transition-colors"
            >
              Select Catchment Manually
            </button>
          </>
        )}

        {state === 'success' && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <MapPin size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-black text-[#0F2018] mb-2">✓ Location detected</h2>
            <p className="text-sm font-bold text-[#4A7C59] mb-2">
              Nearest monitoring area:<br/>{detectedLocationName}
            </p>
            <p className="text-xs text-slate-500 mb-6">
              Location-based safety information is now available.
            </p>
          </>
        )}

      </div>
    </div>
  );
}