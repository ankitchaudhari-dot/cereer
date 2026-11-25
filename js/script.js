document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("interestForm");
    const status = document.getElementById("status");

    if (!form || !status) {
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "SUBMITTING...";
        status.textContent = "";
        status.classList.remove("error");

        const formData = new FormData(form);
        const body = new URLSearchParams();

        formData.forEach((value, key) => {
            body.append(key, String(value));
        });

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: body.toString()
            });

            if (!response.ok) {
                throw new Error(`Submission failed (${response.status})`);
            }

            status.textContent =
                "Thank you for your enquiry. We will contact you soon.";
            form.reset();
        } catch (error) {
            status.textContent =
                "We could not submit the form. Please try again or contact us by phone.";
            status.classList.add("error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "SUBMIT ENQUIRY";
        }
    });
});