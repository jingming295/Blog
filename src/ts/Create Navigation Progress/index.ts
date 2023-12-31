import '../../scss/NavigationProgress/index.scss';
export class NavigationProgress
{

    init()
    {
        const navigationProgress = document.querySelector(".navigation-progress") as HTMLDivElement;
        if (!navigationProgress)
        {
            const navigationProgress = document.createElement("div");
            navigationProgress.classList.add("navigation-progress");
            navigationProgress.style.width = "0";
            document.body.appendChild(navigationProgress);
        }

    }
    start()
    {
        const navigationProgress = document.querySelector(".navigation-progress") as HTMLDivElement;
        if (!navigationProgress) return;
        if(navigationProgress.style.width !== "0px") return;
        // 开始 transition
        navigationProgress.style.transition = "width .4s ease-in-out";
        const randomPercentage = Math.random() * 60 + 20;
        navigationProgress.style.width = `${randomPercentage}%`;
        navigationProgress.style.opacity = "1";
    }

    end(){
        const navigationProgress = document.querySelector(".navigation-progress") as HTMLDivElement;
        if (!navigationProgress) return;
        if(navigationProgress.style.width === "0px") return;
        if(navigationProgress.style.width === "100%") return;
        if(!navigationProgress.style.width) return;
        console.log(navigationProgress.style.width);
        if(navigationProgress.style.width !== "100%"){
            navigationProgress.style.transition = "width .1s ease-in-out";
            navigationProgress.style.width = "100%";
            navigationProgress.addEventListener('transitionend', () =>
            {
                navigationProgress.style.transition = "";
                navigationProgress.style.width = "0";
            }, { once: true });
        }

    }

}