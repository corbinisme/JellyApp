interface Lesson {
    id: string;
    content: string;
    level: string;
}
export type { Lesson };

const lessonsData: Lesson[] = [
    {
        id: 'lesson1',
        content: `<p>
                <strong>Unit 1: Plan of Salvation, Fall Festivals</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU1WK1.pdf">Week 1: God's Holy Days</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU1WK2.pdf">Week 2: Feast of Trumpets</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU1WK3.pdf">Week 3: Day of Atonement</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU1WK4.pdf">Week 4: Feast of Tabernacles/Last Great Day</a>
            </p>
            <p>
                <strong>Unit 2: Learning About God</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU2WK1.pdf">Week 1: God Is Our Father</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU2WK2.pdf">Week 2: The Bible Tells Us How to Live</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU2WK3.pdf">Week 3: We Worship God Through Song</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU2WK4.pdf">Week 4: The Work of God/God's House</a>
            </p>
            <p>
                <strong>Unit 3: Creation</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU3WK1.pdf">Week 1: God Created All Non-Living Things</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU3WK2.pdf">Week 2: God Created All Living Things</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU3WK3.pdf">Week 3: God Created Man</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU3WK4.pdf">Week 4: God Created the Sabbath Day</a>
            </p>
            <p>
                <strong>Unit 4: God's Laws</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU4WK1.pdf">Week 1: Moses and the Ten Commandments</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU4Wk2.pdf">Week 2: God Heals Us</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU4WK3.pdf">Week 3: The Fifth Commandment</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU4WK4.pdf">Week 4: The First Commandment</a>
            </p>
            <p>
                <strong>Unit 5: Jesus Christ</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU5WK1.pdf">Week 1: Jesus Christ - A Special Birth</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU5WK2.pdf">Week 2: Jesus Christ - Miracle of Loaves and Fish</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU5WK3.pdf">Week 3: Jesus Christ - Parable of Lamp Under a Basket</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU5WK4.pdf">Week 4: Blessing of Little Children</a>
            </p>
            <p>
                <strong>Unit 6: Lesson from the Old Testament</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU6Wk1.pdf">Week 1: Cain and Abel - Jealousy</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU6Wk2.pdf">Week 2: Noah and the Ark - Obedience</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU6Wk3.pdf">Week 3: Abraham and Isaac - Obedience</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU6Wk4.pdf">Week 4: Isaac and Rebekah - Trust in God</a>
            </p>
            <p>
                <strong>Unit 7: Lessons from the New Testament</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU7Wk1.pdf">Week 1: Mary and Martha</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU7Wk2.pdf">Week 2: Peter Walks on Water</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU7Wk3.pdf">Week 3: Dorcas - Service to Others</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU7Wk4.pdf">Week 4: Jesus Visits Zaccheus</a>
            </p>
            <p>
                <strong>Unit 8: Plan of Salvation: Spring Festivals</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU8Wk1.pdf">Week 1: God's Plan of Salvation</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU8Wk2.pdf">Week 2: Story of the Old Testament Passover</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU8Wk3.pdf">Week 3: What Is Leavening?</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU8Wk4.pdf">Week 4: Being a First Fruit is a Blessing</a>
            </p>
            <p>
                <strong>Unit 9: Fruits of the Holy Spirit</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU9WK1.pdf">Week 1: Gentleness</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU9WK2.pdf">Week 2: Kindness</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU9WK3.pdf">Week 3: Joy</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU9WK4.pdf">Week 4: Peace</a>
            </p>
            <p>
                <strong>Unit 10: Teachings of Jesus Christ</strong><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU10Wk1.pdf">Week 1: Family Relationships</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU10Wk2.pdf">Week 2: Sibling Relationships</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU10Wk3.pdf">Week 3: The Golden Rule</a><br>
                <a target="_blank" rel="noopener noreferrer" href="https://ucgweb.s3.amazonaws.com/files/youth/ss/levelk/LKU10Wk4.pdf">Week 4: The Promise of the Fifth Commandment</a>
            </p>`,
        level: 'K'
    },
    
];

export default lessonsData;
