// ==================== CORE INTERFACES ====================

interface Pizza {
  getDescription(): string;
  getCost(): number;
  getCalories(): number;
  getItemizedBreakdown(): string[];
}

type PizzaSize = "Small" | "Medium" | "Large";
type ToppingQuantity = "Single" | "Double" | "Extra";

// ==================== BASE PIZZAS ====================

abstract class BasePizza implements Pizza {
  constructor(protected size: PizzaSize) {}

  abstract getBaseName(): string;

  getDescription(): string {
    return `${this.size} ${this.getBaseName()}`;
  }

  getCost(): number {
    const prices = { Small: 8, Medium: 12, Large: 16 };
    return prices[this.size];
  }

  getCalories(): number {
    const calories = { Small: 800, Medium: 1200, Large: 1600 };
    return calories[this.size];
  }

  getItemizedBreakdown(): string[] {
    return [
      `${this.size} ${this.getBaseName()}: $${this.getCost().toFixed(2)}`,
    ];
  }
}

class Margherita extends BasePizza {
  getBaseName(): string {
    return "Margherita Pizza";
  }
}

class Pepperoni extends BasePizza {
  getBaseName(): string {
    return "Pepperoni Pizza";
  }
}

class Veggie extends BasePizza {
  getBaseName(): string {
    return "Veggie Pizza";
  }
}

// ==================== DECORATOR BASE CLASS ====================

abstract class PizzaDecorator implements Pizza {
  constructor(protected pizza: Pizza) {}

  getDescription(): string {
    return this.pizza.getDescription();
  }

  getCost(): number {
    return this.pizza.getCost();
  }

  getCalories(): number {
    return this.pizza.getCalories();
  }

  getItemizedBreakdown(): string[] {
    return this.pizza.getItemizedBreakdown();
  }
}

// ==================== TOPPING DECORATORS (size-dependent) ====================

class Cheese extends PizzaDecorator {
  constructor(pizza: Pizza, private quantity: ToppingQuantity = "Single") {
    super(pizza);
  }

  private getSizeMultiplier(): number {
    const desc = this.pizza.getDescription();
    if (desc.includes("Small")) return 1;
    if (desc.includes("Medium")) return 1.5;
    if (desc.includes("Large")) return 2;
    return 1;
  }

  private getQuantityMultiplier(): number {
    const multipliers = { Single: 1, Double: 2, Extra: 3 };
    return multipliers[this.quantity];
  }

  getDescription(): string {
    const prefix = this.quantity !== "Single" ? `${this.quantity} ` : "";
    return `${this.pizza.getDescription()}, ${prefix}Cheese`;
  }

  getCost(): number {
    const baseCost = 1.5;
    const cost =
      baseCost * this.getSizeMultiplier() * this.getQuantityMultiplier();
    return this.pizza.getCost() + cost;
  }

  getCalories(): number {
    const baseCal = 100;
    const cal = baseCal * this.getQuantityMultiplier();
    return this.pizza.getCalories() + cal;
  }

  getItemizedBreakdown(): string[] {
    const prefix = this.quantity !== "Single" ? `${this.quantity} ` : "";
    const cost = 1.5 * this.getSizeMultiplier() * this.getQuantityMultiplier();
    return [
      ...this.pizza.getItemizedBreakdown(),
      `${prefix}Cheese: +$${cost.toFixed(2)}`,
    ];
  }
}

class Mushrooms extends PizzaDecorator {
  constructor(pizza: Pizza, private quantity: ToppingQuantity = "Single") {
    super(pizza);
  }

  private getSizeMultiplier(): number {
    const desc = this.pizza.getDescription();
    if (desc.includes("Small")) return 1;
    if (desc.includes("Medium")) return 1.5;
    if (desc.includes("Large")) return 2;
    return 1;
  }

  private getQuantityMultiplier(): number {
    const multipliers = { Single: 1, Double: 2, Extra: 3 };
    return multipliers[this.quantity];
  }

  getDescription(): string {
    const prefix = this.quantity !== "Single" ? `${this.quantity} ` : "";
    return `${this.pizza.getDescription()}, ${prefix}Mushrooms`;
  }

  getCost(): number {
    const baseCost = 1.0;
    const cost =
      baseCost * this.getSizeMultiplier() * this.getQuantityMultiplier();
    return this.pizza.getCost() + cost;
  }

  getCalories(): number {
    const baseCal = 30;
    const cal = baseCal * this.getQuantityMultiplier();
    return this.pizza.getCalories() + cal;
  }

  getItemizedBreakdown(): string[] {
    const prefix = this.quantity !== "Single" ? `${this.quantity} ` : "";
    const cost = 1.0 * this.getSizeMultiplier() * this.getQuantityMultiplier();
    return [
      ...this.pizza.getItemizedBreakdown(),
      `${prefix}Mushrooms: +$${cost.toFixed(2)}`,
    ];
  }
}

class Olives extends PizzaDecorator {
  constructor(pizza: Pizza, private quantity: ToppingQuantity = "Single") {
    super(pizza);
  }

  private getSizeMultiplier(): number {
    const desc = this.pizza.getDescription();
    if (desc.includes("Small")) return 1;
    if (desc.includes("Medium")) return 1.5;
    if (desc.includes("Large")) return 2;
    return 1;
  }

  private getQuantityMultiplier(): number {
    const multipliers = { Single: 1, Double: 2, Extra: 3 };
    return multipliers[this.quantity];
  }

  getDescription(): string {
    const prefix = this.quantity !== "Single" ? `${this.quantity} ` : "";
    return `${this.pizza.getDescription()}, ${prefix}Olives`;
  }

  getCost(): number {
    const baseCost = 0.8;
    const cost =
      baseCost * this.getSizeMultiplier() * this.getQuantityMultiplier();
    return this.pizza.getCost() + cost;
  }

  getCalories(): number {
    const baseCal = 40;
    const cal = baseCal * this.getQuantityMultiplier();
    return this.pizza.getCalories() + cal;
  }

  getItemizedBreakdown(): string[] {
    const prefix = this.quantity !== "Single" ? `${this.quantity} ` : "";
    const cost = 0.8 * this.getSizeMultiplier() * this.getQuantityMultiplier();
    return [
      ...this.pizza.getItemizedBreakdown(),
      `${prefix}Olives: +$${cost.toFixed(2)}`,
    ];
  }
}

// ==================== SPECIAL REQUEST DECORATORS ====================

class ExtraSauce extends PizzaDecorator {
  getDescription(): string {
    return `${this.pizza.getDescription()}, Extra Sauce`;
  }

  getCost(): number {
    return this.pizza.getCost() + 0.5;
  }

  getCalories(): number {
    return this.pizza.getCalories() + 50;
  }

  getItemizedBreakdown(): string[] {
    return [...this.pizza.getItemizedBreakdown(), "Extra Sauce: +$0.50"];
  }
}

class ThinCrust extends PizzaDecorator {
  getDescription(): string {
    return `${this.pizza.getDescription()} (Thin Crust)`;
  }

  getCalories(): number {
    return this.pizza.getCalories() - 100; // Thin crust = fewer calories
  }

  getItemizedBreakdown(): string[] {
    return [...this.pizza.getItemizedBreakdown(), "Thin Crust: +$0.00"];
  }
}

class StuffedCrust extends PizzaDecorator {
  getDescription(): string {
    return `${this.pizza.getDescription()} (Stuffed Crust)`;
  }

  getCost(): number {
    return this.pizza.getCost() + 3.0;
  }

  getCalories(): number {
    return this.pizza.getCalories() + 200;
  }

  getItemizedBreakdown(): string[] {
    return [...this.pizza.getItemizedBreakdown(), "Stuffed Crust: +$3.00"];
  }
}

// ==================== BONUS: DISCOUNT DECORATOR ====================

class Discount extends PizzaDecorator {
  constructor(pizza: Pizza, private percentage: number) {
    super(pizza);
  }

  getDescription(): string {
    return `${this.pizza.getDescription()} [${this.percentage}% OFF]`;
  }

  getCost(): number {
    const originalCost = this.pizza.getCost();
    const discount = originalCost * (this.percentage / 100);
    return originalCost - discount;
  }

  getItemizedBreakdown(): string[] {
    const originalCost = this.pizza.getCost();
    const discount = originalCost * (this.percentage / 100);
    return [
      ...this.pizza.getItemizedBreakdown(),
      `Discount (${this.percentage}%): -$${discount.toFixed(2)}`,
    ];
  }
}

// ==================== BONUS: COMBO DECORATOR ====================

class MealDeal extends PizzaDecorator {
  getDescription(): string {
    return `${this.pizza.getDescription()} + Drink + Fries (Meal Deal)`;
  }

  getCost(): number {
    return this.pizza.getCost() + 5.0;
  }

  getCalories(): number {
    return this.pizza.getCalories() + 600; // Drink + Fries calories
  }

  getItemizedBreakdown(): string[] {
    return [...this.pizza.getItemizedBreakdown(), "Drink + Fries: +$5.00"];
  }
}

// ==================== HELPER FUNCTION ====================

function displayOrder(pizza: Pizza): void {
  console.log("\n" + "=".repeat(60));
  console.log("🍕 PIZZA ORDER");
  console.log("=".repeat(60));
  console.log("\nDescription:");
  console.log(pizza.getDescription());
  console.log("\nItemized Breakdown:");
  pizza.getItemizedBreakdown().forEach((item) => console.log(`  • ${item}`));
  console.log("\n" + "-".repeat(60));
  console.log(`Total Cost: $${pizza.getCost().toFixed(2)}`);
  console.log(`Total Calories: ${pizza.getCalories()} kcal`);
  console.log("=".repeat(60));
}

// ==================== USAGE EXAMPLES ====================

console.log("🍕 WELCOME TO PIZZA ORDERING SYSTEM");

// Example 1: Simple Pizza
let order1: Pizza = new Margherita("Medium");
order1 = new Cheese(order1);
displayOrder(order1);

// Example 2: Complex Pizza with Multiple Toppings
let order2: Pizza = new Pepperoni("Large");
order2 = new Cheese(order2, "Double");
order2 = new Mushrooms(order2, "Extra");
order2 = new Olives(order2);
order2 = new ExtraSauce(order2);
order2 = new StuffedCrust(order2);
displayOrder(order2);

// Example 3: Pizza with Discount
let order3: Pizza = new Veggie("Small");
order3 = new Cheese(order3);
order3 = new Mushrooms(order3);
order3 = new ThinCrust(order3);
order3 = new Discount(order3, 20); // 20% off
displayOrder(order3);

// Example 4: Meal Deal
let order4: Pizza = new Margherita("Medium");
order4 = new Cheese(order4, "Double");
order4 = new MealDeal(order4);
order4 = new Discount(order4, 10); // 10% off
