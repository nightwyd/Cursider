// Sample product data (in a real application, this would come from a database)
const products = [
    {
        id: 1,
        name: "Advanced Combat System",
        shortDescription: "Complete combat system with hitboxes, damage calculation, and effects.",
        description: "This premium combat system includes advanced hitbox detection, customizable damage calculation, special effects, combos, and more. Easily integrate into any Roblox game that needs a robust combat system.",
        price: 24.99,
        imageUrl: "https://via.placeholder.com/300x180?text=Combat+System",
        category: "scripts",
        tags: ["combat", "hitbox", "system"],
        rating: 4.7,
        reviewCount: 28,
        active: true
    },
    {
        id: 2,
        name: "Modern UI Kit",
        shortDescription: "Clean, customizable UI components for your Roblox game.",
        description: "A comprehensive UI kit with over 50 modern components including buttons, sliders, toggles, menus, inventory systems, and more. Fully customizable with your own colors and styles. Built with performance in mind.",
        price: 19.99,
        imageUrl: "https://via.placeholder.com/300x180?text=UI+Kit",
        category: "ui-kits",
        tags: ["ui", "interface", "gui"],
        rating: 4.9,
        reviewCount: 42,
        active: true
    },
    {
        id: 3,
        name: "Vehicle Physics Module",
        shortDescription: "Realistic vehicle physics for cars, trucks, motorcycles, and more.",
        description: "Add realistic vehicle physics to your game with this comprehensive module. Includes suspension, engine simulation, transmission, braking, and more. Works with any vehicle model with minimal setup.",
        price: 29.99,
        imageUrl: "https://via.placeholder.com/300x180?text=Vehicle+Physics",
        category: "modules",
        tags: ["vehicle", "physics", "cars"],
        rating: 4.5,
        reviewCount: 19,
        active: true
    },
    {
        id: 4,
        name: "Economy & Currency System",
        shortDescription: "Complete economy system with currencies, shops, and data persistence.",
        description: "Implement a full economy in your game with this system. Features multiple currencies, customizable shops, item purchases, player-to-player trading, and DataStore integration for data persistence.",
        price: 22.99,
        imageUrl: "https://via.placeholder.com/300x180?text=Economy+System",
        category: "systems",
        tags: ["economy", "currency", "shop"],
        rating: 4.8,
        reviewCount: 36,
        active: true
    },
    {
        id: 5,
        name: "Character Customization System",
        shortDescription: "Let players customize their characters with thousands of combinations.",
        description: "A complete character customization system that allows players to modify their appearance with different body parts, clothing, accessories, and more. Includes a user-friendly interface and DataStore integration.",
        price: 27.99,
        imageUrl: "https://via.placeholder.com/300x180?text=Character+Customization",
        category: "systems",
        tags: ["character", "customization", "avatar"],
        rating: 4.6,
        reviewCount: 23,
        active: true
    },
    {
        id: 6,
        name: "Advanced NPC AI Module",
        shortDescription: "Create intelligent NPCs with pathfinding and behavior trees.",
        description: "Give your NPCs realistic behavior with this advanced AI module. Features include pathfinding, behavior trees, dialog systems, and state machines. Perfect for RPGs, open-world games, or any game needing smart NPCs.",
        price: 34.99,
        imageUrl: "https://via.placeholder.com/300x180?text=NPC+AI",
        category: "modules",
        tags: ["ai", "npc", "pathfinding"],
        rating: 4.9,
        reviewCount: 17,
        active: true
    },
    {
        id: 7,
        name: "Day/Night Cycle System",
        shortDescription: "Realistic day/night cycle with weather effects and lighting.",
        description: "Add atmosphere to your game with this day/night cycle system. Includes smooth transitions between times of day, dynamic lighting, customizable weather effects like rain and fog, and more.",
        price: 14.99,
        imageUrl: "https://via.placeholder.com/300x180?text=Day+Night+Cycle",
        category: "scripts",
        tags: ["lighting", "weather", "environment"],
        rating: 4.7,
        reviewCount: 31,
        active: true
    },
    {
        id: 8,
        name: "Inventory System",
        shortDescription: "Flexible inventory system with drag-and-drop, categories, and stacking.",
        description: "A comprehensive inventory system for your game. Features include drag-and-drop functionality, item categories, stacking, weight limits, tooltips, and seamless integration with your existing item system.",
        price: 18.99,
        imageUrl: "https://via.placeholder.com/300x180?text=Inventory+System",
        category: "systems",
        tags: ["inventory", "items", "storage"],
        rating: 4.8,
        reviewCount: 25,
        active: true
    }
];

// Categories data
const categories = [
    {
        id: "all",
        name: "All Categories"
    },
    {
        id: "scripts",
        name: "Scripts"
    },
    {
        id: "ui-kits",
        name: "UI Kits"
    },
    {
        id: "modules",
        name: "Modules"
    },
    {
        id: "systems",
        name: "Systems"
    }
];
