import heroFlagshipImg from '../assets/images/hero_sbc_flagship_1794649003106.jpg';
import heroAiHatImg from '../assets/images/hero_ai_hat_module_1794649004513.jpg';
import heroComputeBladeImg from '../assets/images/hero_compute_cluster_1794649004553.jpg';
import productZeroImg from '../assets/images/product_sbc_zero_1794649006043.jpg';
import productArmorCaseImg from '../assets/images/product_armor_case_1794649004362.jpg';
import productTouchDisplayImg from '../assets/images/product_touch_display_1794649006626.jpg';
import productSbc4bImg from '../assets/images/product_sbc_4b_1794650154517.jpg';
import productPicoMcuImg from '../assets/images/product_pico_mcu_1794650155231.jpg';
import productCm5ModuleImg from '../assets/images/product_cm5_module_1794650155464.jpg';
import productCmCarrierImg from '../assets/images/product_cm_carrier_1794650157816.jpg';
import productPoeHatImg from '../assets/images/product_poe_hat_1794650156890.jpg';
import productNvmeBaseImg from '../assets/images/product_nvme_base_1794650156989.jpg';
import productHqCameraImg from '../assets/images/product_hq_camera_1794650157883.jpg';
import productGanPsuImg from '../assets/images/product_gan_psu_1794650158693.jpg';
import productDinEnclosureImg from '../assets/images/product_din_enclosure_1794650158872.jpg';

export const PRODUCT_CATEGORIES = [
  'All',
  'Boards',
  'Compute Modules',
  'AI & HATs',
  'Accessories',
];

export const PRODUCTS = [
  {
    id: 'berrycore-5-pro',
    slug: 'berrycore-5-pro',
    name: 'BerryCore 5 Pro',
    category: 'Boards',
    featured: true,
    kicker: 'Boards · Flagship',
    tagline: 'Quad-core Cortex-A76 single-board computer with PCIe 3.0',
    basePrice: 65,
    image: heroFlagshipImg,
    imageAlt:
      'BerryCore 5 Pro single-board computer with matte black PCB, crimson anodized heatsink, and 40-pin gold GPIO header',
    shortDescription:
      '2.4 GHz quad-core ARM Cortex-A76 processor, dual 4K60 micro-HDMI outputs, Gigabit Ethernet with PoE+ support, and an exposed PCIe 2.0/3.0 lane.',
    longDescription:
      'Engineered for desktop-class responsiveness on an 85 × 56 mm footprint, the BerryCore 5 Pro pairs our custom 64-bit quad-core silicon with a dedicated I/O controller chip. Run container workloads, dual 4K60 displays, and NVMe SSD boot volumes concurrently without thermal throttling thanks to the integrated anodized aluminum spreader.',
    highlights: [
      '2.4 GHz Quad-Core 64-bit ARM Cortex-A76 SoC',
      'Dual 4K60 HDMI output with hardware HEVC decode',
      'PCIe Gen 2/3 single-lane FPC connector for NVMe or AI HATs',
      'Standard 40-pin color-coded GPIO header and dual 4-lane MIPI transceivers',
    ],
    variants: [
      { id: 'bc5-4gb', label: '4 GB LPDDR4X', price: 65, sku: 'BC5-PRO-04', inStock: true },
      { id: 'bc5-8gb', label: '8 GB LPDDR4X', price: 85, sku: 'BC5-PRO-08', inStock: true },
      { id: 'bc5-16gb', label: '16 GB LPDDR4X', price: 115, sku: 'BC5-PRO-16', inStock: true },
    ],
    specs: [
      { label: 'Processor', value: 'Quad-core ARM Cortex-A76 @ 2.4 GHz' },
      { label: 'Graphics', value: 'VideoCore VII GPU, OpenGL ES 3.1, Vulkan 1.2' },
      { label: 'Memory', value: '4 GB / 8 GB / 16 GB LPDDR4X-4267 SDRAM' },
      { label: 'Networking', value: 'Gigabit Ethernet (PoE+ ready), Wi-Fi 6, BLE 5.3' },
      { label: 'USB Ports', value: '2× USB 3.0 (5 Gbps), 2× USB 2.0' },
      { label: 'Video & Camera', value: '2× micro-HDMI (4K60), 2× 4-lane MIPI DSI/CSI' },
      { label: 'Expansion', value: 'PCIe 2.0 x1 FPC (Gen 3 capable), 40-pin GPIO' },
      { label: 'Power Input', value: '5V / 5A DC via USB-C Power Delivery' },
      { label: 'Dimensions', value: '85 × 56 × 17 mm (48 g)' },
    ],
    shippingNote: 'In stock — ships within 24 hours with 10-year production guarantee',
    warranty: '3-Year Hardware Replacement Warranty',
  },
  {
    id: 'berrycore-ai-hat-plus',
    slug: 'berrycore-ai-hat-plus',
    name: 'BerryCore AI NPU HAT+',
    category: 'AI & HATs',
    featured: true,
    kicker: 'AI & HATs · Featured',
    tagline: '26 TOPS neural inference accelerator & M.2 NVMe bridge',
    basePrice: 72,
    image: heroAiHatImg,
    imageAlt:
      'BerryCore AI NPU HAT+ expansion board mounted on brass standoffs with M.2 NVMe SSD and neural processor chip',
    shortDescription:
      'Hardware neural processing unit delivering up to 26 TOPS INT8 inference alongside a full-speed M.2 2280 NVMe slot over PCIe.',
    longDescription:
      'Bring real-time multi-camera computer vision, speech recognition, and on-device anomaly detection directly to the edge. The BerryCore AI NPU HAT+ snaps cleanly onto the 40-pin header and PCIe ribbon interface, automatically configuring kernel drivers under BerryOS without external power bricks.',
    highlights: [
      'Up to 26 TOPS INT8 neural network inference throughput',
      'Integrated M.2 Key-M slot supporting 2230, 2242, and 2280 NVMe drives',
      'Pass-through 40-pin stacking header and brass mounting kit included',
      'Sustained 2.8 W typical power draw under full YOLOv8 object detection',
    ],
    variants: [
      { id: 'ai-13', label: '13 TOPS Core Edition', price: 72, sku: 'BC-HAT-AI13', inStock: true },
      { id: 'ai-26', label: '26 TOPS Pro Edition', price: 110, sku: 'BC-HAT-AI26', inStock: true },
    ],
    specs: [
      { label: 'Neural Accelerator', value: 'Dedicated NPU, 13 or 26 TOPS (INT8)' },
      { label: 'Host Interface', value: 'PCIe Gen 3 x1 via 16-pin FFC ribbon' },
      { label: 'NVMe Support', value: 'M.2 Key-M (2230 / 2242 / 2280)' },
      { label: 'Typical Power', value: '2.5 W – 4.0 W over PCIe & GPIO rails' },
      { label: 'Supported Frameworks', value: 'ONNX Runtime, TensorFlow Lite, PyTorch' },
      { label: 'Operating Temp', value: '-20°C to +65°C ambient' },
      { label: 'Included Hardware', value: '4× M2.5 brass standoffs, thermal pad, FFC cable' },
      { label: 'Dimensions', value: '65 × 56.5 × 8.5 mm' },
    ],
    shippingNote: 'In stock — includes calibrated thermal interface pad',
    warranty: '2-Year Hardware Warranty',
  },
  {
    id: 'berrycore-compute-blade',
    slug: 'berrycore-compute-blade',
    name: 'BerryCore Compute Blade CM5',
    category: 'Compute Modules',
    featured: true,
    kicker: 'Compute Modules · Featured',
    tagline: 'CNC aluminum blade carrier with PoE+ and 1U rack density',
    basePrice: 89,
    image: heroComputeBladeImg,
    imageAlt:
      'BerryCore Compute Blade CM5 CNC-machined anodized aluminum carrier holding a compact system-on-module computer board',
    shortDescription:
      'High-density anodized aluminum blade carrier engineered for Kubernetes homelabs, industrial gateways, and 19-inch rack clusters.',
    longDescription:
      'Designed for 24/7 cluster availability, the BerryCore Compute Blade combines an embedded system-on-module with a rigid CNC-milled aluminum heatsink chassis, IEEE 802.3at PoE+ power delivery, hardware TPM 2.0 security, and front-facing NVMe storage.',
    highlights: [
      'Up to 20 blades fit inside a standard 1U 19-inch server rack',
      'IEEE 802.3at PoE+ (30W) single-cable power and Gigabit uplink',
      'Hardware watchdog timer, programmable RGB status LED, and UART debug port',
      'CNC-machined anodized aluminum structural carrier plate',
    ],
    variants: [
      { id: 'cm5-lite', label: 'Carrier + CM5 Lite (No eMMC)', price: 89, sku: 'BC-BLADE-LT', inStock: true },
      { id: 'cm5-32', label: 'Carrier + CM5 8GB / 32GB eMMC', price: 119, sku: 'BC-BLADE-32', inStock: true },
      { id: 'cm5-64', label: 'Carrier + CM5 16GB / 64GB eMMC', price: 149, sku: 'BC-BLADE-64', inStock: true },
    ],
    specs: [
      { label: 'Module Socket', value: 'Dual 100-pin high-density mezzanine connectors' },
      { label: 'Storage', value: 'Onboard eMMC 5.1 + M.2 2280 NVMe slot' },
      { label: 'Power Delivery', value: 'PoE+ (802.3at) or USB-C PD (5V/5A)' },
      { label: 'Security', value: 'Infineon OPTIGA TPM 2.0 onboard' },
      { label: 'Chassis Material', value: '6061-T6 Bead-blasted anodized aluminum' },
      { label: 'Fan Control', value: '4-pin PWM low-noise blower header' },
      { label: 'Form Factor', value: '198 × 35 × 19 mm (Single-slot 1U blade)' },
      { label: 'Compliance', value: 'CE, FCC Class A, RoHS 3' },
    ],
    shippingNote: 'Ships tested with burn-in telemetry verification',
    warranty: '5-Year Industrial Support Guarantee',
  },
  {
    id: 'berrycore-nano-w2',
    slug: 'berrycore-nano-w2',
    name: 'BerryCore Nano W2',
    category: 'Boards',
    featured: false,
    kicker: 'Boards · Compact',
    tagline: 'Ultra-slim 65 × 30 mm wireless Linux board for embedded IoT',
    basePrice: 18,
    image: productZeroImg,
    imageAlt:
      'BerryCore Nano W2 compact single-board computer PCB with gold GPIO pads, etched 2.4 GHz wireless antenna, and USB-C port',
    shortDescription:
      'Half-credit-card footprint featuring a 1.2 GHz quad-core Cortex-A53 SoC, dual-band Wi-Fi, BLE 5.2, and sub-watt idle draw.',
    longDescription:
      'When enclosure volume and battery budget dictate every millimeter, the BerryCore Nano W2 delivers full Linux kernel compatibility inside a 65 × 30 mm profile. Ideal for field telemetry nodes, handheld retro consoles, smart home bridges, and classroom robotics kits.',
    highlights: [
      '1.2 GHz quad-core 64-bit ARM Cortex-A53 with 1 GB LPDDR4',
      'Onboard PCB trace antenna with 2.4/5 GHz Wi-Fi & BLE 5.2',
      '40-pin HAT-compatible GPIO footprint (unpopulated or pre-soldered)',
      'Draws just 140 mA idle at 5V for multi-day battery deployments',
    ],
    variants: [
      { id: 'nano-bare', label: 'Unpopulated Header', price: 18, sku: 'BC-NANO-W2', inStock: true },
      { id: 'nano-header', label: 'Pre-Soldered Color GPIO', price: 22, sku: 'BC-NANO-W2H', inStock: true },
    ],
    specs: [
      { label: 'Processor', value: 'Quad-core ARM Cortex-A53 @ 1.2 GHz' },
      { label: 'Memory', value: '1 GB LPDDR4 SDRAM' },
      { label: 'Wireless', value: '802.11ac Wi-Fi + Bluetooth 5.2 LE' },
      { label: 'Interfaces', value: 'mini-HDMI (1080p60), CSI-2 camera, USB-C OTG' },
      { label: 'Storage', value: 'microSD UHS-I slot' },
      { label: 'GPIO', value: '40-pin standard header footprint' },
      { label: 'Power Draw', value: '0.7 W idle / 2.6 W peak @ 5V USB-C' },
      { label: 'Dimensions', value: '65 × 30 × 5.2 mm (11 g)' },
    ],
    shippingNote: 'In stock — bulk classroom packs of 10+ available',
    warranty: '2-Year Hardware Warranty',
  },
  {
    id: 'berrycore-armor-case',
    slug: 'berrycore-armor-case',
    name: 'BerryCore Armor Enclosure',
    category: 'Accessories',
    featured: false,
    kicker: 'Accessories · Thermal',
    tagline: 'CNC-milled gunmetal aluminum passive cooling chassis',
    basePrice: 28,
    image: productArmorCaseImg,
    imageAlt:
      'BerryCore Armor Enclosure CNC-milled gunmetal aluminum passive cooling case with cooling fins and stainless hex screws',
    shortDescription:
      'Zero-fan silent thermal dissipation machined from solid 6063 aluminum billet, dropping sustained CPU temperatures by up to 22°C.',
    longDescription:
      'Eliminate moving parts and dust ingress in industrial and studio environments. Precision-milled internal thermal pillars make direct contact with the SoC, PMIC, and memory chips via high-conductivity silicone pads, turning the entire grooved aluminum shell into a silent radiator.',
    highlights: [
      'Up to 22°C temperature reduction under continuous all-core load',
      'Zero-noise passive operation — no fan bearings to wear out',
      'Full unobstructed access to GPIO ribbon slot, USB, HDMI, and Ethernet',
      'Includes 3× pre-cut 15 W/m·K silicone thermal pads and hex key',
    ],
    variants: [
      { id: 'case-gunmetal', label: 'Anodized Gunmetal', price: 28, sku: 'BC-CASE-GM', inStock: true },
      { id: 'case-obsidian', label: 'Obsidian Matte Black', price: 32, sku: 'BC-CASE-OB', inStock: true },
    ],
    specs: [
      { label: 'Compatibility', value: 'BerryCore 5 Pro & standard 85 × 56 mm SBCs' },
      { label: 'Material', value: 'CNC-machined 6063-T5 Aluminum Alloy' },
      { label: 'Thermal Pad Rating', value: '15.0 W/m·K included (3-zone)' },
      { label: 'GPIO Clearance', value: 'Full 40-pin top cutout + PoE header access' },
      { label: 'Mounting', value: 'Integrated VESA 75 mm & DIN-rail bracket holes' },
      { label: 'Fasteners', value: '4× M2.5 stainless steel socket cap screws' },
      { label: 'Weight', value: '142 g' },
    ],
    shippingNote: 'In stock — ships with hex wrench and thermal pad set',
    warranty: 'Lifetime Structural Warranty',
  },
  {
    id: 'berrycore-touch-display-7',
    slug: 'berrycore-touch-display-7',
    name: 'BerryCore Touch Display 7',
    category: 'Accessories',
    featured: false,
    kicker: 'Accessories · Interface',
    tagline: '7-inch matte IPS 10-point capacitive touchscreen with stand',
    basePrice: 78,
    image: productTouchDisplayImg,
    imageAlt:
      'BerryCore Touch Display 7 matte IPS capacitive touchscreen panel in a slim black aluminum frame on a metal desk stand',
    shortDescription:
      'Anti-glare 1024 × 600 IPS panel framed in anodized black aluminum with single-cable MIPI DSI data and 10-point multi-touch.',
    longDescription:
      'Build kiosks, laboratory test benches, home automation dashboards, and portable workstations without cable clutter. The BerryCore Touch Display 7 connects directly to your board’s DSI port with rear mounting bosses that hide the SBC cleanly behind the display.',
    highlights: [
      '7.0-inch 1024 × 600 IPS panel with 178° wide viewing angles',
      'Anti-glare etched glass surface with 10-point capacitive touch',
      'Rear VESA and direct BerryCore mounting standoffs included',
      'Hardware PWM backlight brightness control from Linux desktop or CLI',
    ],
    variants: [
      { id: 'disp-panel', label: 'Display Panel Only', price: 78, sku: 'BC-DISP-7P', inStock: true },
      { id: 'disp-stand', label: 'Display + Weighted Desk Stand', price: 96, sku: 'BC-DISP-7S', inStock: true },
    ],
    specs: [
      { label: 'Panel Size & Type', value: '7.0" Anti-Glare IPS TFT-LCD' },
      { label: 'Native Resolution', value: '1024 × 600 px (60 Hz)' },
      { label: 'Touch Technology', value: '10-point Capacitive Glass (Optical Bonded)' },
      { label: 'Interface', value: '2-lane MIPI DSI + I2C Touch (single ribbon)' },
      { label: 'Brightness', value: '450 cd/m² with PWM dimming' },
      { label: 'Power Input', value: '5V DC via jumper or USB-C pass-through' },
      { label: 'Dimensions', value: '176 × 108 × 14 mm (340 g)' },
    ],
    shippingNote: 'In stock — includes 150 mm & 300 mm DSI ribbon cables',
    warranty: '2-Year Pixel & Panel Warranty',
  },
  {
    id: 'berrycore-4b-classic',
    slug: 'berrycore-4b-classic',
    name: 'BerryCore 4B Classic',
    category: 'Boards',
    featured: false,
    kicker: 'Boards · Proven Fleet',
    tagline: '1.8 GHz quad-core Cortex-A72 workhorse for long-term deployments',
    basePrice: 45,
    image: productSbc4bImg,
    imageAlt:
      'BerryCore 4B Classic green PCB single-board computer with dual micro-HDMI ports, Gigabit Ethernet, and 40-pin header',
    shortDescription:
      'Cost-efficient 64-bit ARM single-board computer with native Gigabit Ethernet, dual 4K micro-HDMI, and massive community library compatibility.',
    longDescription:
      'Our highest-volume classroom and digital signage board. The BerryCore 4B Classic maintains drop-in mechanical and electrical compatibility with thousands of existing HATs, enclosures, and legacy kernel builds while delivering smooth dual-display HD/4K playback.',
    highlights: [
      '1.8 GHz Quad-Core ARM Cortex-A72 64-bit processor',
      'Drop-in compatibility with existing 40-pin HATs and cases',
      'True Gigabit Ethernet + Dual-band 802.11ac Wi-Fi',
      'Guaranteed production supply through 2034',
    ],
    variants: [
      { id: 'bc4-2gb', label: '2 GB LPDDR4', price: 45, sku: 'BC4-CLS-02', inStock: true },
      { id: 'bc4-4gb', label: '4 GB LPDDR4', price: 55, sku: 'BC4-CLS-04', inStock: true },
      { id: 'bc4-8gb', label: '8 GB LPDDR4', price: 75, sku: 'BC4-CLS-08', inStock: true },
    ],
    specs: [
      { label: 'Processor', value: 'Quad-core ARM Cortex-A72 @ 1.8 GHz' },
      { label: 'Memory', value: '2 GB / 4 GB / 8 GB LPDDR4-3200' },
      { label: 'Networking', value: 'Gigabit Ethernet, 2.4/5 GHz Wi-Fi, BLE 5.0' },
      { label: 'USB Ports', value: '2× USB 3.0, 2× USB 2.0' },
      { label: 'Video Output', value: '2× micro-HDMI (up to 4K60)' },
      { label: 'Power Input', value: '5V / 3A DC via USB-C' },
      { label: 'Dimensions', value: '85 × 56 × 16 mm (46 g)' },
    ],
    shippingNote: 'In stock — volume tray pricing available for schools',
    warranty: '3-Year Hardware Warranty',
  },
  {
    id: 'berrycore-pico-rp2',
    slug: 'berrycore-pico-rp2',
    name: 'BerryCore Pico RP2',
    category: 'Boards',
    featured: false,
    kicker: 'Boards · Microcontroller',
    tagline: 'Dual-core 150 MHz deterministic microcontroller with PIO state machines',
    basePrice: 8,
    image: productPicoMcuImg,
    imageAlt:
      'BerryCore Pico RP2 compact microcontroller PCB with soldered gold pin headers and USB-C connector',
    shortDescription:
      'Low-cost, real-time microcontroller board with 12 programmable I/O state machines, USB-C drag-and-drop flashing, and 16 MB QSPI flash.',
    longDescription:
      'When your project requires microsecond-accurate PWM motor control, custom serial protocols, or ultra-low-power sensor polling without Linux boot overhead, the BerryCore Pico RP2 excels. Program seamlessly in C/C++, MicroPython, or Rust over USB-C.',
    highlights: [
      'Dual ARM Cortex-M33 cores running up to 150 MHz',
      '12 Programmable I/O (PIO) state machines for custom hardware interfaces',
      '26 multi-function GPIO pins including 3× 12-bit ADC inputs',
      'Castellated edges for direct SMD carrier soldering or breadboard headers',
    ],
    variants: [
      { id: 'pico-std', label: 'Standard (Unsoldered)', price: 8, sku: 'BC-PICO-01', inStock: true },
      { id: 'pico-hdr', label: 'With Soldered Headers', price: 10, sku: 'BC-PICO-01H', inStock: true },
      { id: 'pico-wifi', label: 'Pico RP2 Wireless + Headers', price: 14, sku: 'BC-PICO-01W', inStock: true },
    ],
    specs: [
      { label: 'Microcontroller', value: 'Dual-core ARM Cortex-M33 @ 150 MHz' },
      { label: 'SRAM & Flash', value: '520 KB SRAM, 16 MB QSPI Flash' },
      { label: 'GPIO', value: '26× GPIO, 2× SPI, 2× I2C, 2× UART, 16× PWM' },
      { label: 'Debug', value: '3-pin SWD header + USB-C UF2 bootloader' },
      { label: 'Input Voltage', value: '1.8 V – 5.5 V DC (buck-boost regulator)' },
      { label: 'Dimensions', value: '51 × 21 mm' },
    ],
    shippingNote: 'In stock — ships in anti-static reel or single pack',
    warranty: '2-Year Replacement Warranty',
  },
  {
    id: 'berrycore-cm5-module',
    slug: 'berrycore-cm5-module',
    name: 'BerryCore CM5 System Module',
    category: 'Compute Modules',
    featured: false,
    kicker: 'Compute Modules · OEM',
    tagline: 'Mezzanine system-on-module with RF EMI shield and onboard eMMC',
    basePrice: 55,
    image: productCm5ModuleImg,
    imageAlt:
      'BerryCore CM5 System Module bare OEM PCB card with metallic EMI shield and gold mezzanine connectors',
    shortDescription:
      'Embed BerryCore 5 compute power directly into custom medical, robotics, or industrial carrier PCBs via dual 100-pin high-speed connectors.',
    longDescription:
      'Designed for hardware OEMs integrating ARM Linux into custom carrier boards. The BerryCore CM5 System Module places the Cortex-A76 processor, LPDDR4X memory, PMIC, optional Wi-Fi 6 radio, and high-endurance eMMC flash onto a shielded 55 × 40 mm mezzanine card.',
    highlights: [
      '55 × 40 mm compact mezzanine footprint with EMI RF shield',
      'Exposed PCIe Gen 2/3, Gigabit Ethernet PHY, USB 3.0, and dual MIPI',
      'Industrial -25°C to +85°C temperature-graded memory options',
      'FCC/CE modular wireless certification reduces OEM lab compliance cost',
    ],
    variants: [
      { id: 'som-4-32', label: '4 GB RAM / 32 GB eMMC', price: 55, sku: 'BC-CM5-432', inStock: true },
      { id: 'som-8-64', label: '8 GB RAM / 64 GB eMMC + Wi-Fi', price: 79, sku: 'BC-CM5-864W', inStock: true },
      { id: 'som-16-64', label: '16 GB RAM / 64 GB eMMC + Wi-Fi', price: 109, sku: 'BC-CM5-1664W', inStock: true },
    ],
    specs: [
      { label: 'SoC', value: 'Quad-core ARM Cortex-A76 @ 2.4 GHz' },
      { label: 'eMMC Storage', value: '32 GB or 64 GB High-Endurance eMMC 5.1' },
      { label: 'Board-to-Board', value: '2× 100-pin 0.4 mm pitch mezzanine headers' },
      { label: 'Operating Temp', value: '-25°C to +85°C extended industrial range' },
      { label: 'Wireless Cert', value: 'Pre-certified Wi-Fi 6 & BLE 5.3 module' },
      { label: 'Dimensions', value: '55 × 40 × 4.7 mm' },
    ],
    shippingNote: 'In stock — tray quantities of 50 units ship same day',
    warranty: '5-Year OEM Lifecycle Warranty',
  },
  {
    id: 'berrycore-dual-carrier-io',
    slug: 'berrycore-dual-carrier-io',
    name: 'BerryCore Dual Carrier IO',
    category: 'Compute Modules',
    featured: false,
    kicker: 'Compute Modules · Dev Board',
    tagline: 'Full-featured CM5 reference board with PCIe x4 slot & dual LAN',
    basePrice: 68,
    image: productCmCarrierImg,
    imageAlt:
      'BerryCore Dual Carrier IO black reference development PCB with PCIe slot, dual RJ45 LAN jacks, and RTC coin cell battery',
    shortDescription:
      'Reference development carrier board unlocking dual Gigabit Ethernet, full-size PCIe x4 physical slot, dual HDMI, and battery-backed RTC.',
    longDescription:
      'Accelerate bring-up for custom Compute Module carrier designs. The BerryCore Dual Carrier IO exposes every high-speed lane on the CM5 mezzanine socket to industry-standard full-size connectors, complete with a coin-cell RTC holder, dual camera headers, and 12V barrel jack input.',
    highlights: [
      'Full-size PCIe physical slot (x1 Gen 3 electrical) for capture or NIC cards',
      'Dual Gigabit RJ45 Ethernet ports for router, firewall, and NAS builds',
      'Two full-size HDMI 2.0 outputs + two MIPI DSI/CSI connectors',
      'Onboard CR2032 RTC battery holder and 12V wide-input DC jack',
    ],
    variants: [
      { id: 'io-board', label: 'Carrier Board Only', price: 68, sku: 'BC-IO-CARRIER', inStock: true },
      { id: 'io-bundle', label: 'Carrier + CM5 8GB/32GB Bundle', price: 138, sku: 'BC-IO-BND8', inStock: true },
    ],
    specs: [
      { label: 'Compatibility', value: 'BerryCore CM5 & CM4 System Modules' },
      { label: 'Networking', value: '2× Gigabit Ethernet (1 native + 1 PCIe MAC)' },
      { label: 'Expansion', value: 'PCIe Gen 3 slot, 40-pin GPIO, M.2 M-Key' },
      { label: 'Power Input', value: '12V DC barrel jack (2.1 × 5.5 mm) or USB-C' },
      { label: 'RTC Backup', value: 'CR2032 lithium coin-cell socket' },
      { label: 'Dimensions', value: '160 × 90 mm' },
    ],
    shippingNote: 'In stock — includes open KiCad schematic reference files',
    warranty: '3-Year Hardware Warranty',
  },
  {
    id: 'berrycore-poe-plus-hat',
    slug: 'berrycore-poe-plus-hat',
    name: 'BerryCore PoE+ Gigabit HAT',
    category: 'AI & HATs',
    featured: false,
    kicker: 'AI & HATs · Power',
    tagline: 'IEEE 802.3at Power-over-Ethernet HAT with active thermal blower',
    basePrice: 34,
    image: productPoeHatImg,
    imageAlt:
      'BerryCore PoE+ Gigabit HAT circuit board with copper-wound isolation transformer and compact blower fan',
    shortDescription:
      'Power your BerryCore 5 Pro over a single Ethernet cable up to 25.5 W with an isolated planar transformer and silent temperature-controlled fan.',
    longDescription:
      'Deploy ceiling-mounted access points, warehouse barcode kiosks, and outdoor camera gateways without running AC outlets. The BerryCore PoE+ Gigabit HAT delivers full 5V/5A regulated output from any standard 802.3at PoE+ switch while keeping CPU thermals cool via a PWM-governed blower.',
    highlights: [
      'IEEE 802.3at Type 2 compliant (up to 25.5 W isolated output)',
      'Delivers full 5V / 5A rail so USB 3.0 peripherals run unthrottled',
      'Low-profile 25 mm PWM brushless blower controlled by SoC temperature',
      'Galvanic 1.5 kV isolation between Ethernet line and board ground',
    ],
    variants: [
      { id: 'poe-at', label: 'PoE+ 25.5W Standard', price: 34, sku: 'BC-HAT-POE25', inStock: true },
      { id: 'poe-pass', label: 'PoE+ with Tall GPIO Pass-Through', price: 39, sku: 'BC-HAT-POE25T', inStock: true },
    ],
    specs: [
      { label: 'Standard', value: 'IEEE 802.3at (PoE+) & 802.3af backwards compatible' },
      { label: 'Input Voltage', value: '37 V – 57 V DC Class 4 PD' },
      { label: 'Output Rail', value: '5.1 V / 5.0 A continuous regulated' },
      { label: 'Cooling', value: 'Temperature-curves PWM brushless blower' },
      { label: 'Dimensions', value: '65 × 56.5 × 13 mm' },
    ],
    shippingNote: 'In stock — includes nylon standoffs and thermal pads',
    warranty: '3-Year Hardware Warranty',
  },
  {
    id: 'berrycore-nvme-m2-base',
    slug: 'berrycore-nvme-m2-base',
    name: 'BerryCore NVMe M.2 Base',
    category: 'AI & HATs',
    featured: false,
    kicker: 'AI & HATs · Storage',
    tagline: 'Low-profile bottom PCIe Gen 3 NVMe carrier for 2280 SSDs',
    basePrice: 24,
    image: productNvmeBaseImg,
    imageAlt:
      'BerryCore NVMe M.2 Base matte black expansion PCB with installed 2280 SSD, gold FFC ribbon, and brass standoffs',
    shortDescription:
      'Boot BerryOS in under 4 seconds and reach 850 MB/s sequential throughput while keeping the entire 40-pin GPIO header free on top.',
    longDescription:
      'Mounted cleanly underneath your BerryCore 5 Pro, the NVMe M.2 Base frees the top of your board for displays, sensors, or heatsinks. Engineered with controlled-impedance PCIe traces and a dedicated 3.3V 3A buck regulator so power-hungry Gen 4 NVMe SSDs stay rock solid.',
    highlights: [
      'Up to 850 MB/s read speeds over PCIe Gen 3 mode',
      'Under-board mounting leaves top 40-pin GPIO completely unobstructed',
      'Supports 2230, 2242, 2260, and full-length 2280 M.2 NVMe drives',
      'Dedicated onboard 3.3 V / 3 A voltage regulator for heavy write loads',
    ],
    variants: [
      { id: 'nvme-base', label: 'Base Board Only', price: 24, sku: 'BC-NVME-BASE', inStock: true },
      { id: 'nvme-512', label: 'Base + 512 GB Gen4 NVMe Pre-Flashed', price: 69, sku: 'BC-NVME-512', inStock: true },
      { id: 'nvme-1tb', label: 'Base + 1 TB Gen4 NVMe Pre-Flashed', price: 99, sku: 'BC-NVME-1TB', inStock: true },
    ],
    specs: [
      { label: 'Bus Interface', value: 'PCIe Gen 2 / Gen 3 x1 via 16-pin FFC' },
      { label: 'Drive Compatibility', value: 'M.2 M-Key NVMe (2230 / 2242 / 2260 / 2280)' },
      { label: 'Power Supply', value: '3.3 V / 3.0 A dedicated DC-DC rail' },
      { label: 'Included Kit', value: '2× Impedance-matched FFC cables, 4× brass standoffs' },
      { label: 'Dimensions', value: '85 × 56 × 6 mm' },
    ],
    shippingNote: 'In stock — includes spare PCIe ribbon cable',
    warranty: '2-Year Hardware Warranty',
  },
  {
    id: 'berrycore-hq-camera-12mp',
    slug: 'berrycore-hq-camera-12mp',
    name: 'BerryCore HQ Camera 12MP',
    category: 'Accessories',
    featured: false,
    kicker: 'Accessories · Optics',
    tagline: '12.3 MP back-illuminated sensor with CNC C/CS-mount lens assembly',
    basePrice: 59,
    image: productHqCameraImg,
    imageAlt:
      'BerryCore HQ Camera 12MP CNC-machined black aluminum camera housing with manual focus C-mount lens and CSI ribbon',
    shortDescription:
      'Industrial machine-vision and astrophotography camera module featuring a large 1/2.3-inch 12.3 MP sensor and interchangeable C/CS-mount optics.',
    longDescription:
      'Capture crisp raw DNG stills and low-noise 1080p/4K frames over MIPI CSI-2. Enclosed in a precision-milled anodized aluminum body with a standard 1/4"-20 tripod mount and adjustable back-focus ring, the BerryCore HQ Camera is ready for automated optical inspection and laboratory microscopy.',
    highlights: [
      '12.3 MP Sony IMX477 back-illuminated CMOS sensor (1.55 μm pixel pitch)',
      'Interchangeable C/CS-mount aluminum lens collar with locking ring',
      'Integrated 1/4"-20 tripod socket and M2.5 machine mounting holes',
      'Full libcamera ISP tuning and RAW12 DNG capture support',
    ],
    variants: [
      { id: 'cam-body', label: 'Camera Module Body Only', price: 59, sku: 'BC-CAM-HQ', inStock: true },
      { id: 'cam-16mm', label: 'Camera + 16 mm f/1.4 Telephoto Lens', price: 98, sku: 'BC-CAM-HQ16', inStock: true },
    ],
    specs: [
      { label: 'Sensor', value: '12.3 MP 1/2.3" Back-Illuminated CMOS' },
      { label: 'Resolution', value: '4056 × 3040 px stills, 1080p60 / 4K30' },
      { label: 'Lens Mount', value: 'C-mount & CS-mount (adapter included)' },
      { label: 'Interface', value: '2-lane MIPI CSI-2 (15-pin & 22-pin cables)' },
      { label: 'Dimensions', value: '38 × 38 × 18.4 mm (body only)' },
    ],
    shippingNote: 'In stock — includes both BerryCore 5 & 4B CSI cables',
    warranty: '2-Year Optical & Sensor Warranty',
  },
  {
    id: 'berrycore-27w-gan-psu',
    slug: 'berrycore-27w-gan-psu',
    name: 'BerryCore 27W USB-C GaN PSU',
    category: 'Accessories',
    featured: false,
    kicker: 'Accessories · Power',
    tagline: 'Low-ripple 5.1V / 5A GaN Power Delivery supply with braided cable',
    basePrice: 16,
    image: productGanPsuImg,
    imageAlt:
      'BerryCore 27W USB-C GaN power supply brick in matte charcoal with coiled braided USB-C power cable',
    shortDescription:
      'Custom USB-C PD profile tuned specifically for 5.1V / 5A continuous output so high-load SSDs and USB devices never trigger under-voltage warnings.',
    longDescription:
      'Standard smartphone chargers drop voltage under sudden CPU + NVMe current spikes. Built on high-efficiency Gallium Nitride (GaN) switching silicon, the BerryCore 27W PSU holds a tight 5.1V rail up to 5A and includes a 1.5-meter 18AWG braided USB-C cable.',
    highlights: [
      'Dedicated 5.1 V / 5.0 A USB-C PD profile prevents brownout throttling',
      'Also supports 9V/3A, 12V/2.25A, and 15V/1.8A standard PD profiles',
      'Ultra-low < 30 mV peak-to-peak ripple for clean analog audio & ADC readings',
      '1.5 m detachable heavy-gauge braided USB-C cable included',
    ],
    variants: [
      { id: 'psu-us', label: 'US / Type-A Prong + 1.5m Cable', price: 16, sku: 'BC-PSU-27US', inStock: true },
      { id: 'psu-eu', label: 'EU / UK / Multi-Plug Kit', price: 19, sku: 'BC-PSU-27INT', inStock: true },
    ],
    specs: [
      { label: 'Input Range', value: '100–240 V AC, 50/60 Hz' },
      { label: 'Primary SBC Rail', value: '5.1 V DC @ 5.0 A (25.5 W continuous)' },
      { label: 'Max Output', value: '27 W USB Power Delivery 3.0' },
      { label: 'Cable Spec', value: '1.5 m 18AWG E-Marked Braided USB-C' },
      { label: 'Safety Certs', value: 'UL, CE, FCC, UKCA, RoHS' },
    ],
    shippingNote: 'In stock — ships with 1.5 m braided USB-C cable',
    warranty: '3-Year Replacement Warranty',
  },
  {
    id: 'berrycore-din-rail-kit',
    slug: 'berrycore-din-rail-kit',
    name: 'BerryCore DIN-Rail Industrial Kit',
    category: 'Accessories',
    featured: false,
    kicker: 'Accessories · Industrial',
    tagline: 'Extruded aluminum PLC enclosure with 9–36V DC & RS-485 terminals',
    basePrice: 64,
    image: productDinEnclosureImg,
    imageAlt:
      'BerryCore DIN-Rail Industrial Kit anodized black aluminum PLC enclosure mounted on silver DIN rail with green screw terminals',
    shortDescription:
      'Transform any BerryCore 5 Pro into a control-cabinet PLC gateway with 9–36V wide-range isolated power, RS-485 Modbus, and 35 mm DIN-rail clip.',
    longDescription:
      'Built for factory automation panels, solar micro-inverters, and HVAC controllers. The BerryCore DIN-Rail Industrial Kit combines an extruded heatsink chassis with an internal industrial carrier plate featuring 9–36V DC surge-protected power input, isolated RS-485/RS-232 terminals, and 4 opto-isolated digital inputs.',
    highlights: [
      'Snaps directly onto standard 35 mm EN 50022 industrial DIN rails',
      '9 V – 36 V wide DC input with reverse-polarity and surge protection',
      'Pluggable green Phoenix-style screw terminal blocks for RS-485 & GPIO',
      'Extruded aluminum finned chassis rated for fanless 55°C cabinet operation',
    ],
    variants: [
      { id: 'din-kit', label: 'Enclosure + Industrial Terminal Carrier', price: 64, sku: 'BC-DIN-KIT', inStock: true },
      { id: 'din-pro', label: 'Pre-Assembled w/ BerryCore 5 Pro 8GB', price: 145, sku: 'BC-DIN-PRO8', inStock: true },
    ],
    specs: [
      { label: 'Power Input', value: '9 V – 36 V DC via 3-pin screw terminal' },
      { label: 'Field Bus', value: 'Isolated RS-485 (Modbus RTU) + RS-232' },
      { label: 'Digital I/O', value: '4× Opto-isolated inputs, 2× relay outputs' },
      { label: 'Mounting', value: '35 mm Aluminum DIN-rail spring clip' },
      { label: 'Dimensions', value: '112 × 90 × 44 mm (310 g)' },
    ],
    shippingNote: 'In stock — includes DIN clip and mating terminal plugs',
    warranty: '5-Year Industrial Warranty',
  },
];

export const HERO_SLIDES = [
  {
    id: 'slide-flagship',
    productId: 'berrycore-5-pro',
    kicker: 'Flagship Single-Board Computer',
    headline: 'Desktop-class ARM compute on an 85 mm footprint.',
    description:
      'Meet the BerryCore 5 Pro. Engineered with a 2.4 GHz quad-core Cortex-A76 processor, exposed PCIe 3.0 lane, and dual 4K60 outputs for production edge systems.',
    ctaPrimary: 'Inspect Flagship',
    ctaSecondary: 'Full Specifications',
    image: heroFlagshipImg,
    imageAlt: 'BerryCore 5 Pro single-board computer on architectural studio block',
    keyMetrics: [
      { label: 'CPU Clock', value: '2.4 GHz' },
      { label: 'Memory', value: 'Up to 16 GB' },
      { label: 'Starting At', value: '$65' },
    ],
  },
  {
    id: 'slide-ai-hat',
    productId: 'berrycore-ai-hat-plus',
    kicker: 'Edge Neural Acceleration',
    headline: '26 TOPS of on-device inference with NVMe speed.',
    description:
      'Stack the BerryCore AI NPU HAT+ onto your board to run multi-stream vision models and local telemetry pipelines at under 3 watts.',
    ctaPrimary: 'Inspect AI HAT+',
    ctaSecondary: 'Full Specifications',
    image: heroAiHatImg,
    imageAlt: 'BerryCore AI NPU HAT+ expansion board with M.2 NVMe SSD',
    keyMetrics: [
      { label: 'Inference', value: '26 TOPS' },
      { label: 'Storage Bus', value: 'PCIe Gen 3' },
      { label: 'Starting At', value: '$72' },
    ],
  },
  {
    id: 'slide-compute-blade',
    productId: 'berrycore-compute-blade',
    kicker: 'Modular Cluster Hardware',
    headline: '20 ARM nodes inside a single 1U rack chassis.',
    description:
      'The BerryCore Compute Blade CM5 combines CNC-machined thermal aluminum, PoE+ single-cable power, and hardware TPM 2.0 security.',
    ctaPrimary: 'Inspect Blade CM5',
    ctaSecondary: 'Full Specifications',
    image: heroComputeBladeImg,
    imageAlt: 'BerryCore Compute Blade CM5 in CNC anodized aluminum frame',
    keyMetrics: [
      { label: 'Power Input', value: 'PoE+ 30W' },
      { label: 'Security', value: 'TPM 2.0' },
      { label: 'Starting At', value: '$89' },
    ],
  },
];

export const FEATURES = [
  {
    number: '01.',
    title: 'Precision Thermal Architecture',
    description:
      'Every BerryCore board ships with low-resistance power delivery and milled aluminum contact planes to sustain boost clocks under 100% load.',
    metric: '-22°C peak core drop',
  },
  {
    number: '02.',
    title: 'Open 40-Pin & PCIe Ecosystem',
    description:
      'Color-coded GPIO headers, mainline Linux kernel patches, and documented CAD step files let hardware teams move from bench to enclosure fast.',
    metric: '100% mainline kernel',
  },
  {
    number: '03.',
    title: '10-Year Industrial Supply',
    description:
      'Guaranteed component availability through 2036 with strict revision control so your medical, industrial, and retail fleets never face forced redesigns.',
    metric: '2036 lifecycle lock',
  },
  {
    number: '04.',
    title: 'Pre-Flashed Fleet Provisioning',
    description:
      'Order volume batches pre-imaged with your signed OS bundle, custom device-tree overlays, and serialized MAC asset manifests.',
    metric: '24h global dispatch',
  },
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    quote:
      'Before switching to BerryCore 5 Pro, our factory optical inspection stations relied on bulky fan-cooled x86 mini-PCs that clogged every four months. With the Armor Enclosure and AI NPU HAT+, we run two 60 fps camera pipelines silently at 9 watts total.',
    author: 'Hannah Lindholm',
    role: 'Director of Embedded Vision',
    organization: 'Nordic Robotics AB',
    outcome: 'Cut enclosure volume by 68% across 140 assembly lines',
  },
  {
    id: 'test-2',
    quote:
      'Our university IoT lab needed a reliable board that survived daily student breadboarding without fragile SD-card corruption. BerryCore Compute Blades with onboard eMMC booted 3.4x faster and eliminated mid-semester hardware replacements.',
    author: 'Dr. Marcus Vance',
    role: 'Senior Lecturer in Computer Systems',
    organization: 'Bristol Polytechnic Institute',
    outcome: '99.4% lab uptime over three consecutive academic terms',
  },
  {
    id: 'test-3',
    quote:
      'Shipping environmental sensors to remote coastal weather buoys meant every milliamp counted. BerryCore Nano W2 gave us full WireGuard VPN and local SQLite buffering in a 65 mm envelope that fits inside standard IP67 housings.',
    author: 'Priya Subramanian',
    role: 'Principal Telemetry Architect',
    organization: 'Vektor Edge Marine',
    outcome: 'Extended solar battery autonomy from 4 days to 11 days',
  },
  {
    id: 'test-4',
    quote:
      'Moving our Kubernetes CI build runners onto a 16-node BerryCore Compute Blade 1U cluster cut rack power draw from 1.1 kW down to 145 W while keeping native ARM64 container builds 2.2x faster than cloud emulation.',
    author: 'Lukas Weber',
    role: 'Staff Infrastructure Engineer',
    organization: 'Strata Embedded GmbH',
    outcome: '86% lower rack power consumption in Munich colocation',
  },
  {
    id: 'test-5',
    quote:
      'The BerryCore NVMe M.2 Base solved the biggest bottleneck in our point-of-sale kiosks. Leaving the top 40-pin GPIO unobstructed meant our thermal receipt printer and NFC reader HAT stacked cleanly with zero custom cabling.',
    author: 'Claire Beaumont',
    role: 'Head of Retail Hardware',
    organization: 'Atelier Checkout Systems',
    outcome: '4.1-second cold OS boot across 620 retail terminals',
  },
  {
    id: 'test-6',
    quote:
      'When we integrated the BerryCore CM5 System Module into our portable ultrasound cart, having pre-certified Wi-Fi 6 and guaranteed silicon supply through 2036 saved four months of regulatory compliance engineering.',
    author: 'Dr. Kenji Takahashi',
    role: 'VP of Hardware Engineering',
    organization: 'Marrow Medical Imaging',
    outcome: '16 weeks saved on FCC/CE modular certification',
  },
  {
    id: 'test-7',
    quote:
      'Deploying 45 greenhouse climate controllers over single PoE+ Ethernet drops eliminated 110V wiring near irrigation lines. The BerryCore PoE+ Gigabit HAT keeps every node cool even during 42°C summer afternoons.',
    author: 'Mateo Alvarez',
    role: 'Lead Agritech Systems Engineer',
    organization: 'Helios Sensorics',
    outcome: '$18,400 saved on electrical conduit installation',
  },
  {
    id: 'test-8',
    quote:
      'Pairing the BerryCore HQ Camera 12MP with a 16 mm C-mount lens gave our PCB solder-joint inspection jig sub-millimeter clarity without paying $2,500 per industrial smart camera.',
    author: 'Rachel Okafor',
    role: 'Manufacturing Test Lead',
    organization: 'Tecton Fab Co.',
    outcome: '74% lower vision station BOM cost per test bench',
  },
  {
    id: 'test-9',
    quote:
      'The BerryCore DIN-Rail Industrial Kit bolted straight into our substation cabinets on 24V DC power and started polling Modbus RTU inverters in under thirty minutes. Having isolated RS-485 built in removed three extra adapters.',
    author: 'Henrik Solberg',
    role: 'Grid Automation Specialist',
    organization: 'PulseGrid Energy',
    outcome: '35-minute cabinet commissioning per solar substation',
  },
  {
    id: 'test-10',
    quote:
      'Teaching deterministic hardware protocols with BerryCore Pico RP2 PIO state machines let second-year students implement custom WS2812 and CAN bus drivers in Rust without fighting external FPGA toolchains.',
    author: 'Prof. Elena Rostova',
    role: 'Chair of Embedded Systems',
    organization: 'Vertex Polytechnic',
    outcome: '100% of 180 students completed bare-metal lab projects',
  },
  {
    id: 'test-11',
    quote:
      'Our digital museum exhibits needed matte anti-glare touchscreens that wouldn’t wash out under gallery spotlights. BerryCore Touch Display 7 hid the BerryCore 5 Pro completely behind the frame with a single DSI ribbon.',
    author: 'David Gallagher',
    role: 'Exhibition Technologist',
    organization: 'National Science Gallery',
    outcome: 'Zero visible cables across 28 interactive exhibits',
  },
  {
    id: 'test-12',
    quote:
      'Replacing generic phone adapters with the BerryCore 27W USB-C GaN PSU immediately stopped the under-voltage throttling logs we saw whenever field technicians plugged in high-speed LiDAR scanners.',
    author: 'Sonia Patel',
    role: 'Field Robotics Operations',
    organization: 'Kestrel Autonomous',
    outcome: '0 brownout resets over 14,000 logged warehouse hours',
  },
  {
    id: 'test-13',
    quote:
      'Pre-flashed fleet provisioning let us ship 300 BerryCore 4B Classic units straight to regional libraries with signed read-only root filesystems and serialized asset tags ready out of the box.',
    author: 'Thomas Lindqvist',
    role: 'Civic IT Infrastructure Lead',
    organization: 'Borealis Public Networks',
    outcome: 'Saved 110 hours of manual SD-card imaging labor',
  },
];

export const PARTNER_BRANDS = [
  { id: 'b1', name: 'Nordic Silicon', sector: 'Semiconductors', markType: 'circuit' },
  { id: 'b2', name: 'Kestrel Robotics', sector: 'Automation', markType: 'prism' },
  { id: 'b3', name: 'Vektor Edge', sector: 'Telemetry', markType: 'wave' },
  { id: 'b4', name: 'Aether Foundry', sector: 'CNC Enclosures', markType: 'frame' },
  { id: 'b5', name: 'Helios Sensorics', sector: 'Optical Sensors', markType: 'orbit' },
  { id: 'b6', name: 'Strata Embedded', sector: 'Real-Time OS', markType: 'layer' },
  { id: 'b7', name: 'Borealis Cloud', sector: 'Fleet OTA', markType: 'node' },
  { id: 'b8', name: 'CortexWorks', sector: 'Vision AI', markType: 'hex' },
  { id: 'b9', name: 'Marrow Optics', sector: 'MIPI Lenses', markType: 'core' },
  { id: 'b10', name: 'Tecton Fab', sector: 'PCB Assembly', markType: 'grid' },
  { id: 'b11', name: 'PulseGrid', sector: 'Energy IoT', markType: 'pulse' },
  { id: 'b12', name: 'Vertex Labs', sector: 'STEM Kits', markType: 'vertex' },
];
